require('dotenv').config();
const { connectDatabase } = require('../config/db');
const MenuItem = require('../models/MenuItem');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');

async function run() {
	try {
		await connectDatabase(process.env.MONGO_URI);
		const menuPath = path.join(__dirname, 'menu.json');
		const data = JSON.parse(fs.readFileSync(menuPath, 'utf8'));
		if ((await MenuItem.countDocuments()) === 0) {
			await MenuItem.insertMany(data);
			console.log('Seeded menu items');
		}
		if (process.env.ADMIN_CODE) {
			const adminExists = await User.findOne({ role: 'admin' });
			if (!adminExists) {
				await User.create({ name: 'Admin', email: 'admin@sfc.local', password: 'admin123', role: 'admin' });
				console.log('Created admin user (admin@sfc.local / admin123)');
			}
		}
		process.exit(0);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
}

run();