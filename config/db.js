require('dotenv').config();
const mongoose = require('mongoose');
// console.log(process.env.MONGO_CONNECTION_URL)
const uri = process.env.MONGO_CONNECTION_URL
function connectDB() {
    // Database connection 
    mongoose.connect(uri,err => {
        if(err){
            console.log(err)
        }
        else{
            console.log('connected to MongoDB')

        }
    });
}

// mIAY0a6u1ByJsWWZ

module.exports = connectDB;