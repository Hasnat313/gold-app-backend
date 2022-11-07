const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();

const cors = require("cors");
const corsOptions = {
	origin: process.env.BASE_URL_FRONTEND,
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

// mongoose.connect("mongodb://127.0.0.1:27017/GoldShopApp");
mongoose.connect("mongodb+srv://hasnat100:123hasnat@cluster0.pslss.mongodb.net/GoldShopApp")

app.use("/api/purchaseForm", require("./routes/PurchaseFormRoutes"));
app.use("/api/tradeForm", require("./routes/TradeFormRoutes"));
app.use("/api/goldapp", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/verify", require("./routes/emailVerifiactionRoutes"));
app.use("/api/forgotPassword", require("./routes/forgotPasswordRoutes"));
app.use("/api/frontEnd", require("./routes/forntEndAuthRoutes"));

app.listen(process.env.PORT || 5000, function () {
	console.log("server started on port 5000");
});

//port = process.env.PORT || 3000