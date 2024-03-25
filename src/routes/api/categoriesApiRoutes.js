const express = require('express');
const router = express.Router();

const categoriesApiController = require('../../controllers/api/categoriesApiController');

router.get('/', categoriesApiController.getAll);
router.get('/:idCat', categoriesApiController.getOne);

router.get("/:id/colors", categoriesApiController.getColors);


module.exports = router;