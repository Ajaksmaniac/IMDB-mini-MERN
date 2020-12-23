const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//Load input validation

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//Load user model

const User = require("../../Models/User");


// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);
    console.log("REQUEST"+ req);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const username = req.body.username;
    const password = req.body.password;

    //Find User by email

    User.findOne({username:username}).then(user =>{
        console.log(user);
        //Checks if user exists
        if(!user){
            return res.status(404).json({emailnotfound:"Email not found"})
        }
        bcrypt.compare(password,user.password).then(isMatch =>{
            if(isMatch){
                //User matched
                //Create JWT payload

                const payload = {
                    id : user.id,
                    name : user.name
                };

                //Sign token
                jwt.sign(
                    payload,
                    process.env.SECRETORKEY,
                    {
                        expiresIn: 31556926 //1 year
                    },
                    (err,token) =>{
                        res.json({
                            userData: user,
                            success: true,
                            token: "Bearer" + token
                        });
                    }
                );
            }else{
                return res.status(400).json({passwordincorrect:"Password Incorrect"});
            }
        });
    });

    //Check password



});




// @route POST api/user/register
// @desc Register user
// @acces Public
router.post("/register",(req,res)=>{
    //Form validation

    const {errors,isValid} = validateRegisterInput(req.body);
console.log(req.body);
    //Check validation

    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                date:req.body.date,
                username: req.body.username
               
            });
            // Hash password before saving in database
           return bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                   return newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

router.get("/:id",(req,res)=>{
  
   return User.find({_id:req.params.id}).lean().exec(function (err, user) {
       console.log(user);
       console.log(err+"aa");
    if(err){
        return res.send("User does not exist")
    }
      return res.send(user);
    })
  
});

module.exports = router;