const jwt = require('jsonwebtoken');
const User = require('../models/User');

function signToken(user) {
	return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

async function register(req, res, next) {
	try {
		const { name, email, phone, password, adminCode } = req.body;
		if (!name || !password || (!email && !phone)) {
			return res.status(400).json({ message: 'Name, password and (email or phone) are required' });
		}

		const existingEmail = email ? await User.findOne({ email }) : null;
		if (existingEmail) return res.status(400).json({ message: 'Email already in use' });
		const existingPhone = phone ? await User.findOne({ phone }) : null;
		if (existingPhone) return res.status(400).json({ message: 'Phone already in use' });

		const role = adminCode && adminCode === process.env.ADMIN_CODE ? 'admin' : 'user';
		const user = await User.create({ name, email, phone, password, role });
		const token = signToken(user);
		return res.status(201).json({
			token,
			user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role },
		});
	} catch (err) {
		next(err);
	}
}

async function login(req, res, next) {
	try {
		const { identifier, password } = req.body;
		if (!identifier || !password) {
			return res.status(400).json({ message: 'Identifier and password are required' });
		}
		const query = identifier.includes('@') ? { email: identifier } : { phone: identifier };
		const user = await User.findOne(query);
		if (!user) return res.status(401).json({ message: 'Invalid credentials' });
		const match = await user.comparePassword(password);
		if (!match) return res.status(401).json({ message: 'Invalid credentials' });
		const token = signToken(user);
		return res.json({
			token,
			user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role },
		});
	} catch (err) {
		next(err);
	}
}

module.exports = { register, login };