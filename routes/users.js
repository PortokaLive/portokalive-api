const usersController = require('../controller/users')
const auth = require('../config/auth')
const router = require('express').Router();

router.get('/', auth,usersController.list)
router.get('/search', auth,usersController.search)

module.exports = router;