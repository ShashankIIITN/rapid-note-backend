const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
require('dotenv').config();
const GetUser = require('../middleware/getuser');
const Token_Footer = process.env.REACT_APP_WEBTOKEN_FTCODE;

// create user : POST
router.post('/create-user', [
    body('name', "Your Name should be atleast 3 charachters long").isLength({ min: 3 }),
    body('email', "Please enter a valid Email").isEmail(),
    body('password', "Your password should be atleast 5 characters long").isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await Users.findOne({ email: req.body.email });
        if (user) {
            return res.status(500).json({ error: "An user with same email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(await req.body.password, salt);
        user = await Users.create({
            name: req.body.name,
            email: req.body.email,
            password: pass
        });

        const data = { id: user.id }
        const webtokendata = jwt.sign(data, Token_Footer);
        res.json({ webtokendata });
    } catch (error) {
        console.error(error);
        res.status(404).json({ msg: "An error occured, sorry for inconvenience ", error: error.message });
    }
})

module.exports = router;

// login-user : Post 
router.post('/login-user', [
    body('email', "Please enter a valid Email").isEmail(),
    body('password', "Password cant be blank").exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {

        let user = await Users.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ error: "ACCESS DENIED: Incorrect Credenials! email" });
        }
        let comp = await bcrypt.compare(password, user.password);
        if (!comp) {
            return res.status(401).json({ error: "ACCESS DENIED: Incorrect Credenials pass" });
        }
        const data = { id: user.id }
        const webtokendata = jwt.sign(data, Token_Footer);
        res.json({ webtokendata });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "An error occured, sorry for inconvenience ", error: error.message });
    }
});
//get-user : login required : post
router.post('/get-user', GetUser, async (req, res) => {
    try {
        let userID = req.user.id;

        const user = await Users.findById(userID).select("-password");

        res.json( user);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "An error occured, sorry for inconvenience ", error: error.message });
    }
});




