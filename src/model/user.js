const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const lodash = require('lodash');


const userSchema = new Schema({
    username:{
        type:String,
        requred: true
    },
    company:{
        type:String,
        requred: true
    },
    fullname:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required: true,
        select: false
    }
})

userSchema.methods.searchByLodash = function(array,filter){
    return lodash.filter(array,{...filter});
}

userSchema.methods.searchByVanilla = function(array,filter){
    return array.filter(user => {
        for (var key in filter) {
            if (user[key] === undefined || user[key] != filter[key])
              return false;
          }
          return true;
    });
}

module.exports = User = mongoose.model("model_users",userSchema);