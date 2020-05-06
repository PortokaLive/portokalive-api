const isEmpty = require('is-empty');
const validator = require('validator');


module.exports = (data) => {
    let error = {error: "VALIDATION_FAILED",message:{}};
    data.password = isEmpty(data.password) ? "" : data.password;

    if(validator.isEmpty(data.password))
    error.message.password = "Password is required to deactivate your user account.";

    let result = {password:data.password}
    return {
        error,
        result,
        isValid: isEmpty(error.message)
      };
}