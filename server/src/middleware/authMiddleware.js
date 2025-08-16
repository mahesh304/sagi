const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
	try {
		const authHeader = req.headers.authorization || '';
		const token = authHeader.startsWith('Bearer ')
			? authHeader.substring(7)
			: null;

		if (!token) {
			return res.status(401).json({ message: 'Not authorized' });
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = { id: decoded.id, role: decoded.role };
		next();
	} catch (err) {
		return res.status(401).json({ message: 'Invalid token' });
	}
}

function requireAdmin(req, res, next) {
	if (!req.user || req.user.role !== 'admin') {
		return res.status(403).json({ message: 'Admin only' });
	}
	next();
}

module.exports = { authenticate, requireAdmin };






