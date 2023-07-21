const { Router } = require('express')
const route = Router()
const userController = require('../controllers/userController')
const auth = require('../middlewares/auth')

route.post('/api/auth/register', userController.register) // đăng kí
route.post('/api/auth/activation', userController.activate) // xác nhận email đăng kí
route.post('/api/auth/signing', userController.signing) // đăng nhập
route.post('/api/auth/access', userController.access) // lấy ra access token để phân quyển cho user sau khi login
route.post('/api/auth/forgot_pass', userController.forgot) // gửi email forgot password
route.post('/api/auth/reset_pass', auth, userController.reset) // sau khi gửi email xác nhận quên password thì reset password
route.get('/api/auth/user', auth, userController.info) // lấy ra info user
route.patch('/api/auth/user_update', auth, userController.update) // update user
route.get('/api/auth/signout', userController.signout) //logout
route.post('/api/auth/google_signing', userController.google) //login with google

module.exports = route
