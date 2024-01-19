/* eslint-disable no-undef */
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const connect = async () => {
	const connection = await mongoose.connect(process.env.MONGO_URL);
	if (!connection) {
		console.log("DATABASE connection failed! Exiting Now");
		process.emit("SIGTERM");
		process.exit(1);
	}
	console.log("DATABASE connected successfully!");
	return connection;
};

export default { connect };