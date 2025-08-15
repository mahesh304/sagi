const express = require('express');
const { listMenu, createMenuItem, updateMenuItem, deleteMenuItem, uploadImage } = require('../controllers/menuController');
const { authenticate, requireAdmin } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/', listMenu);
router.post('/', authenticate, requireAdmin, createMenuItem);
router.put('/:id', authenticate, requireAdmin, updateMenuItem);
router.delete('/:id', authenticate, requireAdmin, deleteMenuItem);
router.post('/upload', authenticate, requireAdmin, upload.single('image'), uploadImage);

module.exports = router;