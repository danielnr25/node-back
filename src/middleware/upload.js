const multer = require('multer')
const path = require('path');


const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../uploads'));
   },
   filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
   }
});


const upload = multer({
   storage,
   limits: { fileSize: 2 * 1024 * 1024 }, // 2MB máximo
   fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png/;
      const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = fileTypes.test(file.mimetype);
      if (mimetype && extname) {
         return cb(null, true);
      }
      cb(new Error('Solo se permiten imágenes en formato JPG, JPEG o PNG'));
   }
});

module.exports = upload;
