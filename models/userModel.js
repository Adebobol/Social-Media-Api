const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        require: true,
        max: 20,
        unique: true
    },
    password: {
        type: String,
        require: true,
        min: 6
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return

    // hash password
    this.password = await bcrypt.hash(this.password, 12)

    next()
})

userSchema.methods.correctPassword = async function (providedPassword, userPassword) {
    return await bcrypt.compare(providedPassword, userPassword)
}




const User = mongoose.model('User', userSchema)

module.exports = User