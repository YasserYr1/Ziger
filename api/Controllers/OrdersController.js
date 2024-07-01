const Order = require('../models/Orders');
const User = require('../Models/User');

module.exports.createOrder = async (req, res) => {
    const { userId, items, totalPrice } = req.body;
    try {
      const newOrder = new Order({
        user: userId,
        items: items.map(item => ({
          product: item.productId,
          quantity: item.quantity,
          price: item.price
        })),
        totalPrice
      });
      await newOrder.save();
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create order', error });
    }
}

module.exports.getOrdersNumber = async (req, res) => {
    try {
        const orders = await Order.find();
        const usersCount = (await User.find()).length;
        const numberOfOrders = (orders).length;
        const ordersIncomes = orders.reduce((acc, item) => acc + item.totalPrice, 0);

        if(!numberOfOrders){
            return res.status(401).json({message: 'Error in getting the number of orders'});
        }

        res.status(200).json({numberOfOrders, ordersIncomes, usersCount});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};