const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const MovieSchema = new Schema({
    movie_id:{
        type:Number,
        required:false
    },
    name:{
        type:String,
        required:true
    },
    image_url:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
       
    },
    date_of_release:{
        type:Number,
        required:true
    }
});

const Movie = mongoose.model("movie",MovieSchema);
module.exports = Movie;