const route = require('express').Router()
const upload = require('../middlewares/upload')
const uploadImage = require('../middlewares/uploadImage')
const auth = require('../middlewares/auth')
const uploadController = require('../controllers/uploadController')

route.post(
    '/api/upload',
    uploadImage, // ktra file ảnh đã đúng qui tắc hay chưa
    upload, // tải file vào folder
    auth, // ktra xem người dùng đã đăng nhập hay chưa
    uploadController.uploadAvar // thực hiện upload file lên cloud
)

module.exports = route
