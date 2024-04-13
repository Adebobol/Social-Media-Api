const express = require('express')
const router = express.Router()
const { signUp, login, protect } = require('./../controllers/auth')
const userController = require('./../controllers/user')



router.post('/signUp', signUp)
router.get('/login', login)
router.route('/').get(protect, userController.getAllUsers)
router.route('/:id').patch(userController.updateUser).delete(userController.deleteUser).get(userController.getUser)


router.route('/:id/followUser').patch(userController.followUser)
router.route('/:id/unFollowUser').patch(userController.unFollowUser)
module.exports = router