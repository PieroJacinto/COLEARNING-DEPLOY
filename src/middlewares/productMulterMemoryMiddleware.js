const multer = require('multer');
const path = require('path');
const fs = require('fs');
const storage = multer.memoryStorage(); // Almacenamiento en memoria
exports.uploadMemory = multer({
    storage: storage,
});

exports.saveImage = (file) => {

    try {
        // Guardar la imagen en disco
        const uniqueSuffix = "product-" + Date.now() + '-' + Math.round(Math.random() * 1E9)
        const nombreArchivo = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname); // Nombre del archivo con extensión
        const rutaDestino = path.join(__dirname, "../../public/img/products/", nombreArchivo); // Ruta donde se guardará la imagen en disco
        console.log("Nombre de archivo en saveImage:", nombreArchivo);
        // Escribir la imagen en disco
        fs.writeFileSync(rutaDestino, file.buffer);
        return nombreArchivo;
    } catch (error) {
        console.log('Ocurrio un error al guardar la imagen', error);
        return null;
    }
    
}
