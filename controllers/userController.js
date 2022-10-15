const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const EmailSent = require("./uniqueKeyandEmailSender");

const userModel = require("../models/userModel");
const { userSignUpSchema } = require("../validations/Uservalidation");
const { userLoginSchema } = require("../validations/Uservalidation");
require("dotenv").config();
exports.signin = async (req, res) => {
	const { emailAddress, password } = req.body;

	try {
		console.log("ddd");
		// await userLoginSchema.validate(req.body);
		const emailAddress1 = emailAddress.toLowerCase();

		const existingUser = await userModel.findOne({ emailAddress1 });

		if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });


		const existingUser2 = await userModel.findOne({ emailAddress1, isEmailVerified: "false", isUserVerified1: "false" });

		if (existingUser2) return res.status(404).json({ message: "Email Not Verified." });

		const existingUser1 = await userModel.findOne({ emailAddress1, isEmailVerified: "true", isUserVerified: "false" });

		if (existingUser1) return res.status(404).json({ message: "Not Verified by Admin." });

		const isPasswordCorrect = await bcrypt.compare(password, existingUser.hashPassword);

		if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials" });
		if (existingUser.role === 'user') {
			console.log("userrrr");
			const token = jwt.sign({ emailAddress: existingUser.emailAddress1, id: existingUser._id, role: "user" }, "test");
			existingUser.hashPassword = "";
			res.status(200).json({ result: existingUser, token });
		}
		else if (existingUser.role === 'admin') {
			console.log("adminnnn");
			const token = jwt.sign({ emailAddress: existingUser.emailAddress1, id: existingUser._id, role: "admin" }, "test");
			existingUser.hashPassword = "";
			res.status(200).json({ result: existingUser, token });
		}

	} catch (e) {
		res.status(500).json({
			message: "Something went wrong",
			e
		});
	}
};

exports.signup = async (req, res) => {
	const { firstName, lastName, emailAddress, password, confirmPassword } = req.body;
	try {
		await userSignUpSchema.validate(req.body);
		console.log("ddfd");
		const emailAddress1 = emailAddress.toLowerCase();

		const existingUser = await userModel.findOne({ emailAddress1, });

		if (existingUser) return res.status(400).json({ message: "Email already exist.", });

		if (password !== confirmPassword) return res.status(400).json({ message: "Password don't matched." });

		const salt = await bcrypt.genSalt();

		const hashPassword = await bcrypt.hash(password, salt);

		const key = EmailSent.UniqueKey();

		await userModel.create({ emailAddress1, hashPassword, name: `${firstName} ${lastName}`, uniqueKey: key, })

		const htmlString = `<h1>GoldShop</h1> <br/>Press <a href=${process.env.BASE_URL_BACKEND}/api/verify/${key}/>here </a> to verify your Email Thanku`;
		await EmailSent.sendEmail(emailAddress1, htmlString, "Account Verification");

		res.status(200).json(`Verification Email Sent to ${emailAddress}`);
	} catch (e) {
		console.log(e);
		res.status(400).json({
			message: "Something went wrong",
			e
		});
	}
};
