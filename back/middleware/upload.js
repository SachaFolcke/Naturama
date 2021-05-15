const util = require("util");
const multer = require("multer");
const mime = require("mime-types")
const path = require("path");
const maxSize = 10 * 1024 * 1024; // 10MB

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "uploads/");
    },
    filename: (req, file, callback) => {
        req.filename = req.filename + "." + mime.extension(file.mimetype);
        callback(null, req.filename);
    },
});

let uploadFile = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        const ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            req.validationError = 'Seul les images sont autorisées';
            return callback(null, false, new Error('Seul les images sont autorisées'))
        }
        callback(null, true)
    },
    limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = {
    uploadFileMiddleware,
};