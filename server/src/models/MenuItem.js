const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String, default: '' },
		category: {
			type: String,
			enum: ['burgers', 'combos', 'buckets', 'drinks', 'sides', 'desserts', 'sauces', 'snacks'],
			required: true,
		},
		price: { type: Number, required: true },
		imageUrl: { type: String, default: '' },
		isAvailable: { type: Boolean, default: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('MenuItem', menuItemSchema);