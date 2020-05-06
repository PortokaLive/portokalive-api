const isEmpty = require('is-empty');
const validator = require('validator');


module.exports = (data) => {
    let error = {error: "VALIDATION_FAILED",message:{}};
    data.method = isEmpty(data.method) ? "" : data.method;
    data.option = isEmpty(data.option) ? "" : data.option;
    data.company = isEmpty(data.company) ? "" : data.company;
    data.username = isEmpty(data.username) ? "" : data.username;
    data.fullname = isEmpty(data.fullname) ? "" : data.fullname;

    let filter = {};
    if(validator.isEmpty(data.method))
    error.message.method = "Query parameter 'method' is required to filter";
    if(validator.isEmpty(data.option))
    error.message.option = "Query parameter 'option' is required to filter";
    if(validator.isEmpty(data.company) && validator.isEmpty(data.username) && validator.isEmpty(data.fullname))
    error.message.alert = "Query parameter either 'company' or 'username' or 'fullname' is required to filter";

    if(isEmpty(error.message)){
    if(!validator.isEmpty(data.company)){
      filter.company = data.company
    }
    if(!validator.isEmpty(data.username)){
      filter.username = data.username
    }
    if(!validator.isEmpty(data.fullname)){
      filter.fullname = data.fullname
    }
  }

    return {
        error,
        filter,
        isValid: isEmpty(error.message)
      };
}