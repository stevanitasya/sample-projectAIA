const createServer = require("./server");
const mongoose = require("mongoose");
const http = require("http");
require("dotenv").config();

async function startServer() {
	const app = await createServer();
	http.createServer(app).listen(process.env.PORT || 8080, async () => {
		try {
			mongoose.connect(process.env.DATABASE_URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
			const db = mongoose.connection;
			db.once("open", () => {
				console.log("DB connected");
			});
			console.log(`Server is running on http://localhost:${process.env.PORT}`)
            
		} catch (error) {
			console.log(error);
		}
	});
}

startServer();