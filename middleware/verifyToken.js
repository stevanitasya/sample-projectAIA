const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	let token = req.headers.authorization;
	if (!token) {
		return res.status(403).json({
			message: "No Token found!",
		});
	}

	try {
		const jwtPayload = jwt.verify(token, "secret_code");
		if (!jwtPayload) {
			return res.status(403).json({
				message: "No user found!",
			});
		}
		res.user = {
			email: jwtPayload.email,
		};
		next();
	} catch (error) {
		return res.status(500).json({
			message: error,
		});
	}
};

module.exports = verifyToken;