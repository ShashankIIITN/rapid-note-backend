const mongoose = require('mongoose');

const mongooseURI = "mongodb+srv://New-User-forNote:user01@rapid-project-cluster.oova2ap.mongodb.net/rapiddatabase"

mongoose.set('strictQuery', true);
const ConnectToDatabase = () => {

    mongoose.connect(mongooseURI, () => { console.log("Connected to database") })
}
module.exports = ConnectToDatabase;