const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/orders', orderController.createOrder);
router.get('/orders/:orderId', orderController.getOrderById);
router.get('/orders', orderController.getAllOrders);
router.patch('/orders/:orderId/status', orderController.updateOrderStatus);
router.post('/orders/:orderId/cancel', orderController.cancelOrder);

module.exports = router;
