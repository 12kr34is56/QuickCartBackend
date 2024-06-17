const cartModel = require('../models/cart_model');
const orderModel = require('./../models/order_model');
const mongoose = require("mongoose");
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


     updateOrderStatus : async (req, res) => {
        try {
            const { orderId, orderStatus } = req.body;

            // Check if orderId is valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(orderId)) {
                return res.status(400).json({ status: false, message: "Invalid orderId" });
            }

            // Update order status
            const updateOrder = await orderModel.findOneAndUpdate(
                { _id: orderId },
                { orderStatus: orderStatus },
                { new: true }
            );

            if (!updateOrder) {
                return res.status(404).json({ status: false, message: "Order not found" });
            }

            return res.json({ status: true, data: updateOrder });
        } catch (e) {
            console.error("Error in updateOrderStatus:", e);
            return res.status(500).json({ status: false, message: "Internal Server Error" });
        }
    }
};

module.exports = OrderController;