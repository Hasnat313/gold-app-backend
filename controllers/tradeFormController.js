const mongoose = require("mongoose");

const tradeFormModel = require("../models/TradeFormModel");
const incModel = require("../models/incModel2");
const { format, parseISO, parse } = require('date-fns')
require("dotenv").config();
exports.postTradeForm = async (req, res) => {
    try {
        console.log("hasnat");
        console.log(req.body);
        const seq = await inc();
        console.log(seq);
        const obj = { ...req.body, reportID: `PUR-${seq}` };
        const newRecord = new tradeFormModel(obj);

        const pp = await newRecord.save();

        console.log(pp);
        res.status(201).json(newRecord);
        // await purchaseFormModel.deleteMany()

        console.log(seq);
    } catch (e) {
        console.log("mmm");
        console.log(e);
        res.status(400).json(e);
        // res.json("error");
    }
};

exports.getTradeForm = async (req, res) => {
    try {
        const pageSize = 12;
        console.log(req.body);
        console.log(req.query.startDate);
        console.log(req.query.endDate);


        const page = parseInt(req.query.pageSize || 0);
        let startDate = req.query.startDate === 'null' ? "1970/01/01" : format(new Date(req.query.startDate), "yyyy/MM/dd");
        let endDate = req.query.endDate === 'null' ? "4070/01/01" : format(new Date(req.query.endDate), "yyyy/MM/dd");
        let reportID = req.query.reportID === "undefined" ? undefined : req.query.reportID;

        startDate = new Date(startDate + " 00:00");
        endDate = new Date(endDate + " 23:59");
        console.log(startDate);
        console.log(endDate);
        let data;

        if (reportID !== undefined) {
            console.log("else1");
            data = await tradeFormModel
                .find({ reportID })
                .limit(pageSize)
                .skip(pageSize * page);
        } else if (startDate && endDate) {
            console.log("else3");
            data = await tradeFormModel
                .find({ createdAt: { $gte: new Date(startDate), $lt: new Date(endDate) } })
                .limit(pageSize)
                .skip(pageSize * page);
        }

        const count = await tradeFormModel.countDocuments({});

        res.status(201).json({ data, total: Math.ceil(count / pageSize) });
    } catch (e) {
        res.status(400).json(e);
    }
};
exports.calTradeFormCashAndWeight = async (req, res) => {
    try {

        const sellRawaWeight = await tradeFormModel.aggregate(
            [{ $match: { type: "sellRawa" } },
            { $group: { _id: "$type", totalGold: { $sum: "$weight" } } }]
        );
        console.log(sellRawaWeight);
        const sellRawaCash = await tradeFormModel.aggregate(
            [{ $match: { type: "sellRawa" } },
            { $group: { _id: "$type", totalCash: { $sum: "$cash" } } }]
        );
        console.log(sellRawaCash);




        const sellPCSWeight = await tradeFormModel.aggregate(
            [{ $match: { type: "sellPCS" } },
            { $group: { _id: "$type", totalGold: { $sum: "$weight" } } }]
        );
        console.log(sellPCSWeight);
        const sellPCSCash = await tradeFormModel.aggregate(
            [{ $match: { type: "sellPCS" } },
            { $group: { _id: "$type", totalCash: { $sum: "$cash" } } }]
        );
        console.log(sellPCSCash);




        const sellGramiWeight = await tradeFormModel.aggregate(
            [{ $match: { type: "sellGrami" } },
            { $group: { _id: "$type", totalGold: { $sum: "$weight" } } }]
        );
        console.log(sellGramiWeight);
        const sellGramiCash = await tradeFormModel.aggregate(
            [{ $match: { type: "sellGrami" } },
            { $group: { _id: "$type", totalCash: { $sum: "$cash" } } }]
        );
        console.log(sellGramiCash);

        res.json({
            "sellRawaGold": sellRawaWeight[0].totalGold,
            "sellRawaCash": sellRawaCash[0].totalCash,
            "sellPCSGold": sellPCSWeight[0].totalGold,
            "sellPCSCash": sellPCSCash[0].totalCash,
            "sellGramiGold": sellGramiWeight[0].totalGold,
            "sellGramiCash": sellGramiCash[0].totalCash,
        })

    }
    catch (e) {
        console.log(e);
    }
}
const inc = async () => {
    const { seq } = await incModel.findOneAndUpdate({ _id: "6368b1704ceb7b796fd89702" }, { $inc: { seq: 1 } }, { returnOriginal: false });
    return seq;
};

// exports.getPurchaseFormByName = async (req, res) => {
// 	try {
// 		// const newRecord = new purchaseFormModel(req.body);

// 		// const pp = await newRecord.save();
// 		console.log("pp");
// 		const data = await purchaseFormModel.find({ customer: "Ba" });
// 		res.status(201).json(data);
// 	} catch (e) {
// 		console.log("ee");
// 		res.status(400).json(e);
// 		// res.json("error");
// 	}
// };
