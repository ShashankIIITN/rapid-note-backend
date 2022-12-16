const mongoose = require('mongoose');


const Users = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique:true,
        required: true
    },
    password: {
        type: String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.export = mongoose.model('Users', Users);