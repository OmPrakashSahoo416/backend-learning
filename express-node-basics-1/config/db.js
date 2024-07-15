const mongoose = require("mongoose");

// do this step to read the contents of config.env file 
const dotenv = require('dotenv');
dotenv.config({path:"./config/config.env"});


const connectDb = async () => {
    try {
        const connection = mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo database connected @${(await connection).connection.host}`)
        
    } catch (err) {
        console.error(err);
        
    }
}

module.exports = connectDb;