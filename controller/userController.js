const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const OTP = '031002';

module.exports = {
	login: async (req, res) => {
		try {
            // const { id, email, password } = req.body;
			const { id, email, password } = req.body;
			const user = await User.findOne({
                email
            })
			if (!user)
				return res.status(500).json({ message: "User does not exist" });

			if (password !== user.password) {
				return res.status(401).json({ message: "Wrong password!" });
			} 
			if(user) {
                if(password, user.password) {
                    const token = jwt.sign({
                        id: user.id
                    },
                    'secret_key',{
                        expiresIn: '1h'
                    })
                    return res.status(200).json({ message: "Logged in", id, email, password, token })
                    // return res.status(200).json({ message: "Logged in", id, email, password, token })
                }

            }

            return res.status(404).json({
                message: "user not found"
            })
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: error });
		}
	},

	checkOTP: async (req, res) => {
		try {
			const { email, OTPCode } = req.body;
			if (OTPCode !== OTP)
				return res.status(401).json({ message: "Incorrect OTP" });

			const token = jwt.sign(
                { email: email }, "secret_code", {
				expiresIn: "1h",
			});
			return res.status(200).json({ message: "Logged in", email, token });
		} catch (err) {
			return res.status(500).json({ message: err });
		}
	},

	getProfile: async (_, res) => {
		try { 
			const email = res.user.email;
			const user = await User.findOne({
                id, email, Fullname 
            })
			return res.status(200).json({
                data: user,
                message: "ok"
            })
		} catch (err) {
			return res.status(500).json({ message: err });
		}
	}, 

	updateProfile: async (req, res) => {
        try {
            const { userId, newName, newPhone, newEmail, newPassword } = await req.body;

            User.findByIdAndUpdate(userId, req.body, {
                    new: true
            }).then((result) => {
                    if (!result) {
                        return res.status(404).json({
                            message: "user not found"
                        })
                    }
                    return res.status(200).json({
                        data: result,
                        message: "ok"
                    })
                }).catch((err) => {
                    console.log(err);
                })

        } catch (err) {
			return res.status(500).json({ message: err });
        }
    },

};
