const { createOrder, getOrdersNumber } = require("../Controllers/OrdersController");

const router = require("express").Router();

router.post('/createOrder', createOrder);
router.get('/numberOfOrders', getOrdersNumber);

module.exports = router;