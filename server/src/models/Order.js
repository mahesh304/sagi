const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
	{
		item: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
		qty: { type: Number, required: true, min: 1 },
		priceAtPurchase: { type: Number, required: true },
		name: { type: String, required: true }, // Store item name for display
	},
	{ _id: false }
);

const orderSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Made optional for manual orders
		items: { type: [orderItemSchema], required: true },
		total: { type: Number, required: true },
		status: { 
			type: String, 
			enum: ['pending', 'preparing', 'ready', 'delivered', 'cancelled'], 
			default: 'pending' 
		},
		customerName: { type: String, required: true },
		customerPhone: { type: String, required: true },
		customerEmail: { type: String },
		notes: { type: String },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);






