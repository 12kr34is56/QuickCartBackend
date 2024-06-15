const cartModel = require('../models/cart_model');
const orderModel = require('./../models/order_model');

const OrderController = {
    createOrder: async function (req, res) {
        try {
            const { user, items, orderStatus } = req.body;
            const newOrder = new orderModel({
                user: user,
                items: items,
                orderStatus: orderStatus
            });

            await newOrder.save();
            await cartModel.findOneAndDelete({ user: user._id }, { items: [] }, { new: true });

            return res.json({ status: true, data: newOrder, message: "Order created" });
        } catch (e) {
            return res.json({ status: true, message: e });
        }
    },
    fetchOrderById: async function (req, res) {
        try {
            const userId = req.params.userId;
            const foundData = await orderModel.find({
                "user._id": userId,
            });
            return res.json({ status: true, data: foundData });
        } catch (e) {
            return res.json({ status: true, message: e });
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