const express = require('express');
const { createOrder, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { authenticate, requireAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticate, createOrder);
router.get('/', authenticate, requireAdmin, getAllOrders);
router.put('/:id/status', authenticate, requireAdmin, updateOrderStatus);

module.exports = router;