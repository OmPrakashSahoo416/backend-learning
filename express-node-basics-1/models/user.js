const mongoose = require("mongoose");



// creating a user schema to interact with the mongo db 

const userSchema = mongoose.Schema(
    {
        name: String,
        email: String,
        profilePic: String,

    }
);

// to use the model anywhere in the code 
