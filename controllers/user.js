const AppError = require('../utils/AppError')
const User = require('./../models/userModel')
const catchAsync = require('./../utils/catchAsync')

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

// update user

exports.updateUser = async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if (!user) {
        return next(new AppError('No user found', 404))
    }
    res.status(400).json({
        status: "success",
        data: {
            user
        }
    })

}

// delete user
exports.deleteUser = async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
        return next(new AppError('No user found', 404))
    }
    res.status(400).json({
        status: "success",
        data: null
    })

}
// get a user
exports.getUser = async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new AppError('No user found', 404))
    }
    res.status(400).json({
        status: "success",
        data: {
            user
        }
    })

}
// follow a user
exports.followUser = async (req, res, next) => {
    // const currentUser = await User.findOne({ username: req.body.username })
    // console.log(currentUser._id)
    // console.log(req.params.id)
    if (req.params.id === req.body.id) {
        console.log('wr')
        return next(new AppError('You cannot access this!', 401))
    }
    const user = await User.findById(req.params.id)
    const currentUser = await User.findById(req.body.id)
    if (user.followers.includes(req.body.id)) {
        return next(new AppError('User already being followed', 403))
    }
    await user.updateOne({ $push: { followers: req.body.id } })
    await currentUser.updateOne({ $push: { followings: req.params.id } })
    res.status(400).json({
        status: "success",
        data: {

        }
    })

}



// unfollow a user
exports.unFollowUser = async (req, res, next) => {

    if (req.params.id === req.body.id) {

        return next(new AppError('You cannot access this!', 401))
    }
    const user = await User.findById(req.params.id)
    const currentUser = await User.findById(req.body.id)
    if (!user.followers.includes(req.body.id)) {
        return next(new AppError('User already being unFollowed', 403))
    }
    await user.updateOne({ $pull: { followers: req.body.id } })
    await currentUser.updateOne({ $pull: { followings: req.params.id } })
    res.status(400).json({
        status: "success",
        data: {

        }
    })

}
// exports.toFollow = catchAsync(async (req, res, next) => {
//     let token
//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         // console.log(token)
//         token = req.headers.authorization.split(' ')[1]
//         console.log(token)
//     }
//     if (!token) {
//         return next(new AppError('You are not logged in! Please log in to gain access', 401))
//     }

//     // const decoded = await jwt.verify(token, process.env_JWT_SECRET)
//     const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
//     console.log(decoded)
// })
