const express = require("express"),
	router = express.Router(),
	controller = require("../controllers/PurchaseFormController");
const { auth } = require("../middleware/auth")

router.post("/post", controller.postPurchaseForm);
router.get("/get", controller.getPurchaseForm);

module.exports = router;
