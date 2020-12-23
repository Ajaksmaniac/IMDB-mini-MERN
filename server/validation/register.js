const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data){

    //convert fiels to an empty string so we can use validator
    let errors = {};
    data.name = !isEmpty(data.name)? data.name: "";
    data.username = !isEmpty(data.username)? data.username: "";
    data.email = !isEmpty(data.email)? data.email: "";
    data.password = !isEmpty(data.password)? data.password: "";
    data.password2 = !isEmpty(data.password2)? data.password2: "";

    //Name Checks

    if(Validator.isEmpty(data.name)){
        errors.name = "Name field is required";
    }

    //Email cheks
    if(Validator.isEmpty(data.email)){
        errors.email = "Email field is required"
    }else if(!Validator.isEmail(data.email)){
        errors.email = "Email is invalid"
    }

    //Password checks
    if(Validator.isEmpty(data.password)){
        errors.password = "Password field is required";
    }

    if(Validator.isEmpty(data.password2)){
        errors.password2 = "Confirm Password field is required";
    }

    if(!Validator.isLength(data.password,{min:6,max:30})){
        errors.password = "Password must be atleast 6  charachters";
    }

    if(!Validator.equals(data.password, data.password2)){
        errors.password = "Passwords must match"
    }

    return{
        errors,
        isValid: isEmpty(errors)
    };
};