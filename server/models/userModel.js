const { Schema, model } = require('mongoose')

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter your name'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Please enter your email'],
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Please enter your password'],
            min: 6
        },
        avatar: {
            type: String,
            default:
                'https://res.cloudinary.com/dh9eghpuy/image/upload/v1662704994/avatar/blank-profile-picture-g31b9ece4e_640_dsq3qr.png'
        }
    },
    { timestamp: true }
)

const User = model('User', userSchema)

module.exports = User
