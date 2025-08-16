const mongoose = require('mongoose');

async function connectDatabase(mongoUri) {
	if (!mongoUri) {
		throw new Error('MONGO_URI is not defined');
	}
	
	mongoose.set('strictQuery', true);
	
	try {
		   await mongoose.connect(mongoUri);
		   console.log('Connected to MongoDB successfully');
		   return mongoose.connection;
	   } catch (error) {
		   console.error('MongoDB connection error:', error.message);
		   throw error;
	   }
}

module.exports = { connectDatabase };


