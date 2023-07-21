const jwt = require('jsonwebtoken')

const createToken = {
    // tạo token
    activation: (payload) => {
        // token sẽ hết hạn sau 5p
        return jwt.sign(payload, process.env.ACTIVATION_TOKEN, { expiresIn: '5m' })
    },
    // tạo mới token
    refresh: (payload) => {
        return jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: '24h' })
    },
    // tạo token phân quyền cho user
    access: (payload) => {
        return jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '15m' })
    }
}

module.exports = createToken
