const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const upload = require('../middlewares/multerMiddleware');
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require('../middlewares/adminMiddleware')

// Products list // Solo falta descomentar el render
router.get("/", productController.index);

// Cart // solo se cambia si creamos el cart
router.get("/cart", productController.cart);

// Search product //
router.post('/search',productController.search )


// Create product //
router.get("/create",authMiddleware,adminMiddleware, productController.createProduct);
router.post("/", upload.single('product'), productController.create2);

// Product Detail // Solo falta descomentar el render♠
router.get("/:id", productController.detail);

// Edit product //
router.get("/:id/edit",authMiddleware,adminMiddleware, productController.productToEdit);  // aqui solo falta ver lo de los colores
router.put("/:id", upload.single('product') ,productController.update2)

// delete element //
router.delete('/:id',authMiddleware,adminMiddleware,productController.delete)


// Post comment
router.post("/:id/comment", authMiddleware, productController.comment);
module.exports = router;
