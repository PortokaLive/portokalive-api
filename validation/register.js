const isEmpty = require('is-empty');
const validator = require('validator');


module.exports = (data) => {
    let error = {error: "VALIDATION_FAILED",message:{}};
    data.username = isEmpty(data.username) ? "" : data.username;
    data.fullname = isEmpty(data.fullname) ? "" : data.fullname;
    data.company = isEmpty(data.company) ? "" : data.company;
    data.password = isEmpty(data.password) ? "" : data.password;
    data.passwordConfirm = isEmpty(data.passwordConfirm) ? "" : data.passwordConfirm;

    if(validator.isEmpty(data.company))
    error.message.company = "Company is required";
    if(validator.isEmpty(data.username))
    error.message.username = "Username is required";
    if(validator.isEmpty(data.fullname))
    error.message.fullname = "Fullname is required";
    if(validator.isEmpty(data.password))
    error.message.password = "Password is required";
    if(validator.isEmpty(data.passwordConfirm))
    error.message.passwordConfirm = "Password needs to be confirmed";
    else if(data.password != data.passwordConfirm){
      error.message.passwordConfirm = "Passwords do not match";
    }

    let result = {company:data.company,username:data.username,password:data.password}
    return {
        error,
        result,
        isValid: isEmpty(error.message)
      };
}