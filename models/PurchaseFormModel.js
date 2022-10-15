const mongoose = require("mongoose");
const purchaseFormSchema = mongoose.Schema({
    customer: {
        type: String,
        required: true,
    },

    pondWeight: {
        type: Number,
        required: true,
    },
    mail: {
        type: Number,
        required: true,
    },
    finalWeight: {
        type: Number,
        required: true,
    },
    gramRate: {
        type: Number,
        required: true,
    },
    pureWeight: {
        type: Number,
        required: true,
    },
    rate: {
        type: Number,
        required: true,
    },

    cash: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
    },
    reportID: {
        type: String,
        require: true
    },
    sellerName: {
        type: String,
        require: true
    }

}, {
    timestamps: true
});
const purchaseFormModel = mongoose.model("purchaseFormData", purchaseFormSchema, "purchaseFormData");


module.exports = purchaseFormModel;