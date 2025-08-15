const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
	{
		item: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
		qty: { type: Number, required: true, min: 1 },
		priceAtPurchase: { type: Number, required: true },
	},
	{ _id: false }
);

const orderSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		items: { type: [orderItemSchema], required: true },
		total: { type: Number, required: true },
		status: { type: String, enum: ['pending', 'processing', 'completed'], default: 'pending' },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);