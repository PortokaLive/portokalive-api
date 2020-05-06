const userController = require('../controller/user')
const auth = require('../config/auth')
const router = require('express').Router();

router.get('/',(req,res) => {
    res.json({status:"API is healthy", routes: [
        "POST /register",
        "POST /login",
        "GET /me",
        "PUT or PATCH /me",
        "DELETE /me"
    ]})
})

router.post('/register',userController.register)
router.post('/login',userController.login)
router.get('/me', auth, async(req, res) => {
    res.send(req.user)
})
router.put('/me', auth,userController.updateUser)
router.patch('/me', auth,userController.updateUser)
router.delete('/me',auth,userController.deleteUser)



module.exports = router;