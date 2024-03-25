const express = require('express');
const router = express.Router();

const brandApiController = require('../../controllers/api/brandApiController');

router.get("/", brandApiController.getAll);
module.exports = router;