const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken');
exports.frontEndAuth = (req, res) => {

    try {
        // const token = req.headers.authorization.split(" ")[1];
        const { data1 } = req.body;

        const token = data1;
        let decodedData;
        // console.log(token);

        if (token) {
            // console.log("pp");
            decodedData = jwt.verify(token, 'test');
            const role = decodedData.role;
            // console.log(role);
            if (role === "user") {
                res.json({ role: "user" })
            }
            else if (role === "admin") {
                res.json({ role: "admin" })
            }
            else {
                res.json({ role: "No role Specified" })
            }
            console.log(decodedData);
        }
        else {
            res.json({ role: "No tokken" });
        }
    } catch (e) {
        console.log(e);
        res.json(e);
    }

}