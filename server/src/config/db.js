const mongoose = require('mongoose');

async function connectDatabase(mongoUri) {
	if (!mongoUri) {
		throw new Error('MONGO_URI is not defined');
	}
	mongoose.set('strictQuery', true);
	await mongoose.connect(mongoUri, {
		serverSelectionTimeoutMS: 15000,
	});
	return mongoose.connection;
}

module.exports = { connectDatabase };