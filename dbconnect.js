const mongoose = require('mongoose');

const mongooseURI = "mongodb://127.0.0.1:27017/?directConnection=true&readPreference=primary"

mongoose.set('strictQuery', true);
const ConnectToDatabase = () => {

    mongoose.connect(mongooseURI, () => { console.log("Connected to database") })
}
module.exports = ConnectToDatabase;