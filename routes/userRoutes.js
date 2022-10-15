const express = require("express"),
	router = express.Router(),
	controller = require("../controllers/userController");

router.post("/signup", controller.signup);
router.post("/signin", controller.signin);

module.exports = router;
