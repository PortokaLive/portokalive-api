const router = require('express').Router();
const userRouter = require('./user')
const usersRouter = require('./users')

router.get('/',(req,res) => {
    res.json({status:"API is healthy", routes: [
        "/v1/user",
        "/v1/users"
    ]})
})

router.use('/v1/user',userRouter)
router.use('/v1/users',usersRouter)



module.exports = router;