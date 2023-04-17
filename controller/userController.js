const Users = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const OTP = '031002';

module.exports = {
	login: async (req, res) => {
		try {
			const { email, password } = req.body;
			const user = await Users.findOne(
				{ 
					email: email 
				});
			if (!user)
				return res.status(500).json({ message: "User does not exist" });

			if (password !== user.password) {
				return res.status(401).json({ message: "Wrong password!" });
			} 
			const token = jwt.sign(
                { email: email }, "secret_code", {
				expiresIn: "1h",
			});
			return res.status(200).json({ token: token });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ message: err });
		}
	},

	checkOTP: async (req, res) => {
		try {
			const { email, OTPCode } = req.body;
			if (OTPCode !== OTP)
				return res.status(401).json({ message: "Incorrect OTP" });

			// const token = jwt.sign(
            //     { email: email }, "secret_code", {
			// 	expiresIn: "1h",
			// });
			// return res.status(200).json({ token: token });
			return res.status(200).json({ message: "Logged in", email });
		} catch (err) {
			return res.status(500).json({ message: err });
		}
	},

	changeName: async (req, res) => {
		try {
			// const { email, name } = res.body;
			const { nameUpdated } = req.body;

			const updatedUser = await Users.findOneAndUpdate(
				{ name: nameUpdated },
				{
					new: true,
				}
			);
			return res.status(200).json({ message: "User succesfully updated", updatedUser });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: error });
		}
	},

	changeEmail: async (req, res) => {
		try {
			const email = res.user.email;
			const { EmailUpdated } = req.body;

			const updatedUser = await Users.findOneAndUpdate(
				{email: email},
				{email: EmailUpdated},
				{new: true}
			);
			return res
				.status(200)
				.json({ message: "User succesfully updated", updatedUser });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ message: err });
		}
	},

	changePassword: async (req, res) => {
		try {
			const email = res.user.email;
			const { password } = req.body;

			const updatedUser = await Users.findOneAndUpdate(
				{ email: email },
				{ password: password },
				{
					new: true,
				}
			);
			return res.status(200).json({ message: "User succesfully updated", updatedUser });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: error });
		}
	},
};
