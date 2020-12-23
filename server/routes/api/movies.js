const { json } = require('body-parser');
const express = require('express');
const { default: validator } = require('validator');
const router = express.Router();
const Movie = require('../../Models/Movie')
const validateMovieInput = require("../../validation/movie");




//return all movies
router.get('/all',function (req,res){
  

   return Movie.find({}).lean().exec(function (err, movies) {
      // console.log(movies);
      // console.log(JSON.stringify(movies));
        return res.send(JSON.stringify(movies));
    })
})

router.get('/name/:name',function(req,res){
  const name = req.params.name;
  if(validator.isEmpty(name)) return res.json({message:"No movie found"});
  return Movie.find({name:{$regex:'.*' + name +'.*'}}).then(movie =>{
    return res.send(JSON.stringify(movie))
  })
})
//Adds a new movie
router.post('/add',async function (req,res,next){
  
  const {errors,isValid} = validateMovieInput(req.body);
  if(!isValid){
    return res.json({errors})
  }else{
    Movie.find(
      {
        name:req.body.name,
        rating:req.body.rating,
        date_of_release:req.body.date_of_release
      }
      ).then(movie=>{
      if(movie == []){
        //console.log(movie+"MOv");
         res.json({errors:"Movie already exist"})
      }else{
        try{
          Movie.countDocuments({},(err,count)=>{
            req.body.movie_id = count+1;
            const mov = new Movie(req.body);
            
            const createdMovie  =  mov.save();
            //console.log(createdMovie + "MOVIUE");
            res.json(createdMovie);
          })
        
        }catch(error){
         // console.log(error.name);
          if(error.name === 'ValidationError'){
              res.status(422);
          }
          next(error);
        }
      }
     
    })
    
  }
 
    
 })
  //GET MOVIE BY ID
 router.get('/:movieId', function (req,res,next){
     const id = req.params.movieId;
    // console.log(id);
    return Movie.find({movie_id:id}).lean().then(movie=> {
     // console.log(movie);
      if(movie){
      //  console.log(movie);
         return res.send(JSON.stringify(movie));
      }else{
         return res.status(404).json({message:"Movie not found"})
      }
        
     })
      
   })
   //DELETE MOVIE BY ID
   router.delete('/delete/:movieId', function (req,res,next){
    const id = req.params.movieId;
    //console.log(id);
   return Movie.deleteOne({movie_id:id}).lean().exec(function (err, movie) {
        
        return res.send("Movie deleted");
    })
     
  })
module.exports = router;