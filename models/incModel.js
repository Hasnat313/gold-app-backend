const mongoose = require("mongoose");
const incSchema = mongoose.Schema({
    seq: {
        type: Number,
        rquired: true,

    }
})


const incModel = mongoose.model("inc", incSchema, "inc");
module.exports = incModel;
