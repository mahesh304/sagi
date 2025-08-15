const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');

async function createOrder(req, res, next) {
	try {
		const { items } = req.body; // [{ itemId, qty }]
		if (!Array.isArray(items) || items.length === 0) {
			return res.status(400).json({ message: 'Items are required' });
		}
		const ids = items.map((i) => i.itemId);
		const dbItems = await MenuItem.find({ _id: { $in: ids } });
		const dbMap = new Map(dbItems.map((i) => [String(i._id), i]));
		let total = 0;
		const orderItems = items.map((i) => {
			const dbItem = dbMap.get(String(i.itemId));
			if (!dbItem) throw new Error('Invalid item in cart');
			const qty = Math.max(1, Number(i.qty || 1));
			const line = dbItem.price * qty;
			total += line;
			return { item: dbItem._id, qty, priceAtPurchase: dbItem.price };
		});
		const order = await Order.create({ user: req.user.id, items: orderItems, total });
		res.status(201).json(order);
	} catch (err) {
		next(err);
	}
}

async function getAllOrders(req, res, next) {
	try {
		const orders = await Order.find().populate('user', 'name email phone').sort({ createdAt: -1 });
		res.json(orders);
	} catch (err) {
		next(err);
	}
}

async function updateOrderStatus(req, res, next) {
	try {
		const { id } = req.params;
		const { status } = req.body; // 'pending' | 'processing' | 'completed'
		const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
		if (!order) return res.status(404).json({ message: 'Order not found' });
		res.json(order);
	} catch (err) {
		next(err);
	}
}

module.exports = { createOrder, getAllOrders, updateOrderStatus };