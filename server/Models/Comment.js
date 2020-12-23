const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const CommentSchema = new Schema({
    movie_id:{
        type:Number,
        required:true
    },
    user_id:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    date_posted:{
        type:Date,
        required:true
    }
});

const Comment = mongoose.model("comment",CommentSchema);
module.exports = Comment;