const express = require('express');
const router = express.Router();
const Movie = require('../../Models/Movie')
const Comment = require('../../Models/Comment')





//return all comments
router.get('/all',function (reg,res){
  

   return Comment.find({}).lean().exec(function (err, comments) {
       console.log(movies);
       console.log(JSON.stringify(movies));
        return res.send(JSON.stringify(comments));
    })
})

router.get('/:id',function (req,res){
  
    const id = req.params.id;
    return Comment.find({movie_id:id}).lean().exec(function (err, comments) {
        //console.log(movies);
        //console.log(JSON.stringify(movies));
         return res.send(JSON.stringify(comments));
     })
 })


//Adds a new Comments
router.post('/add',async function (req,res,next){
  try{
    const com = new Comment(req.body);
    const createdComment  = await com.save();
    res.json(createdComment);
  }catch(error){
    console.log(error.name);
    if(error.name === 'ValidationError'){
        res.status(422);
    }
    next(error);
  }
    
 })

 /*router.get('/:movieId', function (req,res,next){
     const id = req.params.movieId;
     console.log(id);
    return Movie.find({movie_id:id}).lean().exec(function (err, movie) {
       
         return res.send(JSON.stringify(movie));
     })
      
   })*/

module.exports = router;