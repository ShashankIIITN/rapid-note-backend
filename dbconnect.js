const mongoose = require('mongoose');

const mongooseURI = "mongodb://localhost:27017/?readPreference=primary&directConnection=true/"

mongoose.set('strictQuery', true);
const ConnectToDatabase = () =>{

    mongoose.connect(mongooseURI, ()=>{console.log("Connected to database")})
}
module.exports = ConnectToDatabase;