const jwt = require('jsonwebtoken')
const User = require('../model/user')
const keys = require('./keys')

const auth = async(req, res, next) => {
    if(req.header('Authorization')){
    const token = req.header('Authorization').replace('Bearer ', '')
    try {
    const data = jwt.verify(token, keys.secretKey)
        const user = await User.findOne({ _id: data.id})
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'INVALID_AUTHORIZATION',message:"Not authorized to access this resource"})
    }
    }
    else
    res.status(401).send({ error: 'INVALID_AUTHENTICATION',message:"There is no bearer token in authorization header" })
}
module.exports = auth