const express = require("express");
const router = express.Router();
const userApiController = require("../../controllers/api/userApiController");

router.get("/", userApiController.getAll);

router.post("/login", userApiController.login);


router.get("/:id", userApiController.findOne);

router.get("/validate/:email", userApiController.validate);

module.exports = router;
