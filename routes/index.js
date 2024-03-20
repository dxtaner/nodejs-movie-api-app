const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

router.get("/", userController.home);
router.post("/register", userController.register);
router.post("/authenticate", userController.authenticate);

module.exports = router;
