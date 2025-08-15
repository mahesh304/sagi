const path = require('path');
const fs = require('fs');
const multer = require('multer');

const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
	fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadsDir);
	},
	filename: function (req, file, cb) {
		const ext = path.extname(file.originalname);
		const base = path.basename(file.originalname, ext).replace(/[^a-z0-9]/gi, '_').toLowerCase();
		cb(null, `${Date.now()}_${base}${ext}`);
	},
});

function fileFilter(req, file, cb) {
	if (/^image\//.test(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error('Only image uploads are allowed'));
	}
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

module.exports = { upload };