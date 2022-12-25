const mongoose = require('mongoose');
require('dotenv').config();

const mongooseURI = process.env.REACT_APP_DATABASE_URI

mongoose.set('strictQuery', true);
const ConnectToDatabase = () => {

    mongoose.connect(mongooseURI, () => { console.log("Connected to database") })
}
module.exports = ConnectToDatabase;