const User = require('../model/user.js.js')
const logger = require("../logging/logger")
const isEmpty = require("is-empty")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const validateRegister = require('../validation/register')
const validateLogin = require('../validation/login')
const validateUpdate = require('../validation/update')
const validateDelete = require('../validation/delete')

exports.register = (req,res) => {
    try{
        const {error, result, isValid } = validateRegister(req.body);
        if(!isValid){
        logger.log('error',"Request Body is not valid",error)
        res.status(400).json(error);
        }
        else{
            const {password,passwordConfirm,...findUser} = result;
            User.findOne({...findUser}).then(user => {
                if (user) {
                    logger.log('error',`Username ${req.body.username} at Company ${req.body.company} already exists`)
                    var alertMsg = {alert:`Username ${req.body.username} at Company ${req.body.company} already exists`}
                  return res.status(400).json({error:"INVALID_INPUT",message:alertMsg});
                } else {
                    let newUser = new User({...req.body})
                    bcrypt.genSalt(10, (err,salt) => {
                        bcrypt.hash(newUser.password,salt,(err,hash) => {
                            if(err)
                            throw err;
                            newUser.password = hash;
                            newUser.save().then(user => {
                                res.json(user);
                                logger.log('info','User is registered',user)
                            }).catch( err => {
                                logger.log('error',err)
                                res.status(400).json({error:"EXCEPTION_CAUGHT",message:err.message})
                            })
                        })
                    })
                }
            })
        }
    }
    catch(err){
        logger.log('error',err)
        res.status(403).json({error:"EXCEPTION_CAUGHT",message:err.message})
    }
}

exports.login = (req,res) => {
    try{
    const {error, result, isValid} = validateLogin(req.body)
    if(!isValid){
        logger.log('error',"Request Body is not valid",error)
        return res.status(400).json(error)
    } else {
        const {password,...findUser} = result
        User.findOne({...findUser}).select('+password').then( user => {
            if(!user){
                logger.log('error',`Username ${req.body.username} at Company ${req.body.company} not found`)
                    var alertMsg = {alert:`Invalid Credentials`}
                  return res.status(400).json({error:"INVALID_INPUT",message:alertMsg});
            }
            else{
                bcrypt.compare(req.body.password,user.password).then( isMatch => {
                    if(isMatch){
                        const {password,__v,_id,...payloadData} = user._doc;
                        const payload = {id:_id,...payloadData};
                        jwt.sign(payload,keys.secretKey,{
                            expiresIn: 31556926 // 1 year in seconds
                          }, (error,token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token
                              });
                          })
                    }
                    else {
                        logger.log('error',`Password incorrect`)
                        var alertMsg = {alert:`Invalid Credentials`}
                      return res.status(400).json({error:"INVALID_INPUT",message:alertMsg});
                    }
                })
            }
        })
    }
}
catch(err){
    logger.log('error',err)
    res.status(403).json({error:"EXCEPTION_CAUGHT",message:err.message})
}
}

exports.updateUser = (req,res) => {
    try{
    const {error, filter,isValid} = validateUpdate(req.query)
    if(!isValid){
        logger.log('error',"Request Query is not valid",error)
        return res.status(400).json(error)
    } else {
                const {password,...otherFilter} = filter;
                if(password){
                bcrypt.genSalt(10, (err,salt) => {
                    bcrypt.hash(password,salt,(err,hash) => {
                        if(err)
                        throw err;
                        filter.password = hash;
                        User.findOneAndUpdate({_id:req.user._id},{...filter}).then( data => {
                        const {__v,_id,...userData} = req.user._doc;
                        data = {id:_id,...userData,...filter}
                        jwt.sign(data,keys.secretKey,{
                            expiresIn: 31556926 // 1 year in seconds
                          }, (error,token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token,
                                result: data
                              });
                          })
                        }).catch( err => {
                            logger.log('error',err)
                            res.status(403).json({error:"EXCEPTION_CAUGHT",message:err.message})
                        })
                    })
                })
            } else {
                User.findOneAndUpdate({_id:req.user._id},{...filter}).then( data => {
                    const {__v,_id,...userData} = req.user._doc;
                    data = {id:_id,...userData,...filter}
                    jwt.sign(data,keys.secretKey,{
                        expiresIn: 31556926 // 1 year in seconds
                      }, (error,token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token,
                            result: data
                          });
                      })
                }).catch( err => {
                    logger.log('error',err)
                    res.status(403).json({error:"EXCEPTION_CAUGHT",message:err.message})
                })
            }
            }
}
catch(err){
    logger.log('error',err)
    res.status(403).json({error:"EXCEPTION_CAUGHT",message:err.message})
}
}

exports.deleteUser = (req,res) => {
    try{
    const {error, result, isValid} = validateDelete(req.body)
    if(!isValid){
        logger.log('error',"Request Body is not valid",error)
        return res.status(400).json(error)
    } else {
        User.findOne({_id:req.user._id}).select('+password').then( user => {
            if(!user){
                logger.log('error',`Username ${req.body.username} at Company ${req.body.company} not found`)
                    var alertMsg = {alert:`Invalid Credentials`}
                  return res.status(400).json({error:"INVALID_INPUT",message:alertMsg});
            }
            else{
                bcrypt.compare(result.password,user.password).then( isMatch => {
                    if(isMatch){
                        user.remove().then( result => {
                            logger.log('info','success delete')
                            res.json({
                                success:true,
                                result:user,
                                message:'User has been deleted'
                            })
                        }).catch( err => {
                            logger.log('error',err)
                            res.status(403).json({error:"EXCEPTION_CAUGHT",message:err.message})
                        })
                    }
                    else {
                        logger.log('error',`Password incorrect`)
                        var alertMsg = {password:`Invalid Credentials`}
                      return res.status(400).json({error:"INVALID_INPUT",message:alertMsg});
                    }
                })
            }
        })
    }
}
catch(err){
    logger.log('error',err)
    res.status(403).json({error:"EXCEPTION_CAUGHT",message:err.message})
}
}
