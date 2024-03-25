const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");
const { uploadMemory } = require('../middlewares/userMulterMemoryMiddleware');
const { validateUser, validatePassword, validateLogin, validateUpdate } = require("../validators/userValidator");



const router = express.Router();

// Register //

router.get("/register", guestMiddleware, userController.register);
router.post("/register", guestMiddleware, uploadMemory.single("avatar"), validateUser, validatePassword, userController.processRegister);

// Login //

router.get("/login", guestMiddleware, userController.login);
router.post("/login", guestMiddleware, validateLogin, userController.processLogin);

// Profile //

router.get("/profile", authMiddleware, userController.profile);

// Edit //

router.get("/edit", authMiddleware, userController.edit);
router.put('/edit', authMiddleware, uploadMemory.single('avatar'), validateUpdate, userController.update)

// Logout //
router.get('/logout', authMiddleware, userController.logout)

// Delete //
router.delete('/', authMiddleware, userController.delete)



module.exports = router;
