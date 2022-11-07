const express = require("express"),
    router = express.Router(),
    controller = require("../controllers/tradeFormController");
const { auth } = require("../middleware/auth")

router.post("/post", controller.postTradeForm);
router.get("/get", controller.getTradeForm);

module.exports = router;
