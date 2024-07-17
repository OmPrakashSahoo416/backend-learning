const mongoose = require("mongoose");



// creating a user schema to interact with the mongo db 

const userSchema = mongoose.Schema(
    {
        id: String,
        name: String,
        profilePic: String,

    }
);

// const User = mongoose.model('user',userSchema);
module.exports = mongoose.model("User", userSchema);




// to use the model anywhere in the code 
