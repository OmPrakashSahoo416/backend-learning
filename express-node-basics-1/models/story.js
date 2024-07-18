const mongoose = require("mongoose");



// creating a user schema to interact with the mongo db 

const storySchema = mongoose.Schema(
    {
        title: String,
        body: String,
        author: String,
        createdAt: {
            type: Date,
            default: Date.now()

        }

    }
);

module.exports = mongoose.model("Story", storySchema);




// to use the model anywhere in the code 
