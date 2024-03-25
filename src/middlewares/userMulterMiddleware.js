const path = require('path')

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public", '/img/users'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = "user-" + Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
});

// const fileFilter = (req, file, cb) => {
//     // const extensions = ['.jpg', '.png', '.jpeg'];
//     // const fileExtension = path.extname(file.originalname)
//     // console.log(file);
//     // if(!extensions.includes(fileExtension)) {
//     //     const error = `Los formatos permitidos son ${extensions.join(', ')}`;
//     //     req.fileError = error;
//     //     return cb(null, false);
//     // };

//     // cb(null, true);


//     if (
//         file.mimetype === 'image/jpeg' ||
//         file.mimetype === 'image/png' ||
//         file.mimetype === 'image/jpg'
//       ) {
//         // Si es una imagen, aceptar el archivo
//         cb(null, true);
//       } else {
//         // Si no es una imagen, rechazar el archivo
//         req.fileError = "El archivo debe ser una imagen JPEG, PNG o JPG.";
//         return cb(null, false);
//     };
// }

const upload = multer({ storage: storage });


module.exports = upload;