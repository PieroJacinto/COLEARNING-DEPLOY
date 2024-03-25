const express = require('express');
const router = express.Router();
const authMiddleware = require("../../middlewares/authMiddleware");
const productApiController = require('../../controllers/api/productApiController');
const { validateCreateProduct } = require('../../validators/productValidator');

const { uploadMemory } = require('../../middlewares/productMulterMemoryMiddleware');

// Post
router.post('/create', uploadMemory.single('product'), /* authMiddleware, */ validateCreateProduct, productApiController.create);
router.put("/:id", uploadMemory.single('product'), productApiController.update);
router.get('/', productApiController.getAll);

router.get('/count', productApiController.count);

router.get('/last', productApiController.getLast);

router.get('/categories/:id', productApiController.getCategories);

router.get("/:productId", productApiController.getProduct);

router.delete('/:id',productApiController.delete)


module.exports = router;