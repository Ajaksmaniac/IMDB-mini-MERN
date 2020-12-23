const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateMovieInput(data) {
    let errors = {};
    console.log(data.username);
    data.name = !isEmpty(data.name) ? data.name : "";
    data.image_url = !isEmpty(data.image_url) ? data.image_url : "";
    data.rating = !isEmpty(data.rating) ? data.rating : "";
    data.date_of_release = !isEmpty(data.date_of_release) ? data.date_of_release : "";
    // Email checks
    if (Validator.isEmpty(data.name)) {
        errors.username = "Name field is required";
    } 
    if (Validator.isEmpty(data.image_url)) {
        errors.password = "Image field is required";
    }
    if (Validator.isEmpty(data.rating)) {
        errors.username = "Rating field is required";
    } 
    if (Validator.isEmpty(data.date_of_release)) {
        errors.password = "Year of release field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };

}