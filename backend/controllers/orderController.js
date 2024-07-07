const { Order, OrderItem } = require('../models/order');

exports.createOrder = async (req, res) => {
  try {
    const { buyerId, sellerId, totalAmount, items } = req.body;

    const order = await Order.create({ buyerId, sellerId, totalAmount, status: '已下单' });

    const orderItems = items.map(item => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price
    }));

    await OrderItem.bulkCreate(orderItems);

    res.status(201).json({ order, orderItems });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order', error });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findByPk(orderId, {
      include: [OrderItem]
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Error fetching order', error });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [OrderItem]
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Error updating order status', error });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { userId, role } = req.body;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.paymentStatus === '未支付') {
      await order.destroy();
      return res.status(200).json({ message: 'Order canceled' });
    }

    if (role === 'buyer') {
      order.buyerCancelRequest = true;
    } else if (role === 'seller') {
      order.sellerCancelRequest = true;
    }

    if (order.buyerCancelRequest && order.sellerCancelRequest) {
      await order.destroy();
      return res.status(200).json({ message: 'Order canceled' });
    }

    await order.save();
    res.status(200).json(order);
  } catch (error) {
    console.error('Error canceling order:', error);
    res.status(500).json({ message: 'Error canceling order', error });
  }
};
