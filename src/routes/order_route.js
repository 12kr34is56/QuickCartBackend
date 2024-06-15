const orderRouter = require("express").Router();
const orderController = require("./../controllers/order_controller");

orderRouter.post('/', orderController.createOrder);
orderRouter.get('/:userId', orderController.fetchOrderById);
orderRouter.put('/updateOrder', orderController.updateOrderStatus);

module.exports = orderRouter;