const User = require('../model/user.js')
const isEmpty = require("is-empty")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const validateSearch = require('../validation/search')

exports.list = (req,res) => {
    try{
        User.find({}).then( user => {
            if(!user){
                console.log('debug',`Nothing found`);
                return res.status(400).json({error:"EMPTY_LIST",message:`Nothing found in database`});
            }
            else{
                console.log('debug',`User ${req.user.username} from Company ${req.user.company} has queried the user list`);
                res.json({message:`User ${req.user.username} from Company ${req.user.company} has queried the user list`,userlist:user})
            }
        })
    }
catch(err){
    console.log('error',err)
    res.status(403).json({error:"EXCEPTION_CAUGHT",message:err.message})
}
}

exports.search = (req,res) => {
    try{
        const {error,filter,isValid} = validateSearch(req.query)
        if(!isValid){
            console.log('error',"Request Query is not valid",error)
            return res.status(400).json(error)
        } else {
        switch(req.query.method){
            case 'find':
                searchByFind(req,res,filter);
                break;
            case 'findOne':
                searchByFindOne(req,res,filter);
                break;
            default:
                    console.log('error',"Query option is required")
                    res.status(403).json({error:"INVALID_INPUT",message:"Query option should be 'find' or 'findOne'"})
        }
    }
    }
catch(err){
    console.log('error',err)
    res.status(403).json({error:"EXCEPTION_CAUGHT",message:err.message})
}
}

const searchByFind = (req,res,filter) => {
    console.time('searchFunc');
    User.find({}).then( user => {
        if(!user){
            console.log('debug',`Nothing found`);
            return res.status(400).json({error:"EMPTY_LIST",message:`Nothing found in database`});
        }
        else{
            let searchList = [];
            let searchUser = new User();
            switch(req.query.option){
                case 'lodash':
                    searchList = searchUser.searchByLodash(user,filter)
                    break;
                case 'vanilla':
                    searchList = searchUser.searchByVanilla(user,filter)
                    break;
            }
            console.timeEnd('searchFunc');
            console.log('debug',`User ${req.user.username} from Company ${req.user.company} has searched the user list`);
                        res.json({message:`User ${req.user.username} from Company ${req.user.company} has searched the user list`,
                        option:req.query.option,userlist:searchList})
        }
    })
}

const searchByFindOne = (req,res,filter) => {
        console.time('searchFunc');
        User.findOne({...filter}).then( user => {
            if(!user){
                console.log('debug',`Nothing found`);
                return res.status(400).json({error:"EMPTY_LIST",message:`Nothing found in database`});
            }
            else{
                console.timeEnd('searchFunc');
                console.log('debug',`User ${req.user.username} from Company ${req.user.company} has searched the user list`);
                            res.json({message:`User ${req.user.username} from Company ${req.user.company} has searched the user list`
                            ,userlist:user})
            }
        })
    }
    