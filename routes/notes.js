const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');
const GetUser = require('../middleware/GetUser');
const { findOne } = require('../models/Notes');

//create-note : post
router.post('/create-note', GetUser, [
    body('title', "Title field cant be empty").exists(),
    body('description', "Description field cant be empty").exists()
], async (req, res) => {

    let valerrors = validationResult(req);
    if (!valerrors.isEmpty()) {
        return res.status(400).json({ errors: valerrors.array() });
    }

    let { title, description, tag } = req.body;

    try {
        let note = Notes({
            user: req.user.id,
            title: title,
            description: description,
            tag: tag
        })

        let SvdNote = await note.save();
        res.json(SvdNote);
    } catch (error) {
        res.status(401).send({ error: error.message })
    }
});


// get-all-notes : get
router.get('/get-allnote', GetUser, async (req, res) => {

    const notes = await Notes.find({ user: req.user.id });

    res.json(notes);

});

// update-note/:id : put

router.put('/update-note/:id', GetUser, [
    body('title', "Title field cant be empty").exists(),
    body('description', "Description field cant be empty").exists()
], async (req, res) => {

    let valerrors = validationResult(req);
    if (!valerrors.isEmpty()) {
        return res.status(400).json({ errors: valerrors.array() });
    }

    const { title, description, tag } = req.body;
    try {
        let newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send({ error: "Not Found" });
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send({ error: "Bad Request" });
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        if (description.trim() === "" || title.trim() === "") {

            return res.status(401).send({ note, ok: false });
        }
        return res.status(200).send({note,  ok: true });    
    } catch (error) {
        res.status(500).send({ error: error.message });
    }


});

// delete-note/:id
router.delete('/delete-note/:id', GetUser, async (req, res) => {

    try {

        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send({ error: "Not Found" });
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send({ error: "Bad Request" });
        }

        note = await Notes.findByIdAndDelete(req.params.id);

        res.send({ Success: "Deleted Successfully  ", note: note });
    } catch (error) {
        res.status(500).send({ error: error, msg: error.message });
    }
})

module.exports = router;