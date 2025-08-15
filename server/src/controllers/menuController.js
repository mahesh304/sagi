const MenuItem = require('../models/MenuItem');

async function listMenu(req, res, next) {
	try {
		const { category } = req.query;
		const filter = {};
		if (category) filter.category = category;
		const items = await MenuItem.find(filter).sort({ createdAt: -1 });
		res.json(items);
	} catch (err) {
		next(err);
	}
}

async function createMenuItem(req, res, next) {
	try {
		const { name, description, category, price, imageUrl, isAvailable } = req.body;
		if (!name || !category || price == null) {
			return res.status(400).json({ message: 'name, category, price are required' });
		}
		const item = await MenuItem.create({ name, description, category, price, imageUrl, isAvailable });
		res.status(201).json(item);
	} catch (err) {
		next(err);
	}
}

async function updateMenuItem(req, res, next) {
	try {
		const { id } = req.params;
		const updates = req.body;
		const item = await MenuItem.findByIdAndUpdate(id, updates, { new: true });
		if (!item) return res.status(404).json({ message: 'Item not found' });
		res.json(item);
	} catch (err) {
		next(err);
	}
}

async function deleteMenuItem(req, res, next) {
	try {
		const { id } = req.params;
		const item = await MenuItem.findByIdAndDelete(id);
		if (!item) return res.status(404).json({ message: 'Item not found' });
		res.json({ message: 'Deleted' });
	} catch (err) {
		next(err);
	}
}

async function uploadImage(req, res, next) {
	try {
		if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
		const imageUrl = `/uploads/${req.file.filename}`;
		res.status(201).json({ imageUrl });
	} catch (err) {
		next(err);
	}
}

module.exports = { listMenu, createMenuItem, updateMenuItem, deleteMenuItem, uploadImage };