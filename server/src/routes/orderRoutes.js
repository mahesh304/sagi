const express = require('express');
const { createOrder, getAllOrders, updateOrderStatus, getUserOrders } = require('../controllers/orderController');
const { authenticate, requireAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Allow creating orders without authentication (for manual orders)
router.post('/', createOrder);
router.get('/', authenticate, requireAdmin, getAllOrders);
router.get('/my-orders', authenticate, getUserOrders);
router.put('/:id/status', authenticate, requireAdmin, updateOrderStatus);

module.exports = router;






