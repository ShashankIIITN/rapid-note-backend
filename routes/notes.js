const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');

router.post('/create-note',[
    body('title', "Title field cant be empty").exists(),
    body('description', "Description field cant be empty").exists()
], async (req, res) => {

    let note = await Notes.create({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag
    })
    console.log(note);
    res.json(note);
})

module.exports = router;