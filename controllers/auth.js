const AppError = require('../utils/AppError')
const User = require('./../models/userModel')
const jwt = require('jsonwebtoken')
const token = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
}

exports.getAllUsers = async (req, res, next) => {
    const newUser = await User.find()

    res.status(200).json({
        message: "success",
        data: {
            totalUsers: newUser.length,
            user: newUser
        }
    })
}

exports.signUp = async (req, res, next) => {
    const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
    })
    const signUpToken = token(newUser._id)
    res.status(200).json({
        message: "success",
        signUpToken,
        data: {
            user: newUser
        }
    })
}

exports.login = async (req, res, next) => {
    const { username, password } = req.body

    if (!username || !password) return next(new AppError('No username or password input', 401))

    const user = await User.findOne({ username }).select('password')

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Invalid user', 401))
    }
    const loginToken = token(user._id)

    res.status(200).json({
        status: 'success',
        loginToken
    })
}
