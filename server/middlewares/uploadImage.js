const multer = require('multer')

// set storage
const storage = multer.diskStorage({
    // desitnation => tạo thư mục lưu ảnh
    destination: function (req, res, cb) {
        cb(null, './uploads/')
    },
    // filename => tạo tên cho file
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname)
    }
})

const filerFilter = (req, file, cb) => {
    cb(null, true)
}

let upload = multer({
    storage: storage,
    fileFilter: filerFilter
})

// uplaod vào thư avatar tên cloudinary
module.exports = upload.single('avatar')
