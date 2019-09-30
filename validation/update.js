const isEmpty = require('is-empty');
const validator = require('validator');


module.exports = (data) => {
    let error = {error: "VALIDATION_FAILED",message:{}};
    data.fullname = isEmpty(data.fullname) ? "" : data.fullname;
    data.password = isEmpty(data.password) ? "" : data.password;

    let filter = {};
    if(validator.isEmpty(data.fullname) && validator.isEmpty(data.password))
    error.message.alert = "Query parameter either 'fullname' or 'password' is required to update";

    if(!validator.isEmpty(data.fullname)){
      filter.fullname = data.fullname
    }
    if(!validator.isEmpty(data.password)){
      filter.password = data.password
    }

    return {
        error,
        filter,
        isValid: isEmpty(error.message)
      };
}