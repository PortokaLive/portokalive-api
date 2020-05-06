const isEmpty = require('is-empty');
const validator = require('validator');


module.exports = (data) => {
    let error = {error: "VALIDATION_FAILED",message:{}};
    data.company = isEmpty(data.company) ? "" : data.company;
    data.username = isEmpty(data.username) ? "" : data.username;
    data.password = isEmpty(data.password) ? "" : data.password;

    if(validator.isEmpty(data.company))
    error.message.company = "Company is required";
    if(validator.isEmpty(data.username))
    error.message.username = "Username is required";
    if(validator.isEmpty(data.password))
    error.message.password = "Password is required";

    let result = {company:data.company,username:data.username,password:data.password}
    return {
        error,
        result,
        isValid: isEmpty(error.message)
      };
}