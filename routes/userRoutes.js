const express = require('express')
const router = express.Router()
const { signUp, getAllUsers, login } = require('./../controllers/auth')



router.post('/signUp', signUp)
router.get('/login', login)
router.route('/').get(getAllUsers)


module.exports = router