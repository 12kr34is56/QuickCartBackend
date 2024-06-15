const cartModel = require('../models/cart_model');
const orderModel = require('./../models/order_model');

const OrderController = {
    // Create Order
    createOrder: async function (req, res) {
        try {
            const { user, items, orderStatus } = req.body;
            const newOrder = new orderModel({
                user: user._id,
                items: items,
                orderStatus: orderStatus
            });

            await newOrder.save();
            //it should be removed from cart list
            await cartModel.findOneAndDelete({ user: user._id });

            return res.json({ status: true, data: newOrder, message: "Order created" });
        } catch (e) {
            return res.json({ status: false, message: e.message });
        }
    },

    // Fetch Order by User ID
    fetchOrderById: async function (req, res) {
        try {
            const userId = req.params.userId;
            const foundData = await orderModel.find({
                user: userId
            });
            return res.json({ status: true, data: foundData });
        } catch (e) {
            return res.json({ status: false, message: e.message });
        }
    },
    updateOrderStatus: async function (req, res) {
        try {
            const { orderId, orderStatus } = req.body;
            const updateOrder = await orderModel.findOneAndUpdate(
                { _id: orderId },
                { orderStatus: orderStatus },
                { new: true }
            );
            return res.json({ status: true, data: updateOrder });
        } catch (e) {
            return res.json({ status: true, message: e });
        }
    }
};

module.exports = OrderController;