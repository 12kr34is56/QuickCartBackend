const CartModel = require('./../models/cart_model');
const mongoose = require('mongoose');
const cartController = {
    fetchCart: async function (req, res) {
        try {
            const userID = req.params.userID;
            const foundData = await CartModel.findOne({ userID }).populate("items.productID");

            if (!foundData) {
                return res.status(200).json({ status: true, data: [] });
            }
            return res.status(200).json({ status: true, data: foundData });

        } catch (e) {
            return res.status(500).json({ status: false, message: e.message });
        }
    },

    createCart: async function (req, res) {
        try {
            const { userID } = req.params;
            const { productID, quantity } = req.body;

            // Check if the cart exists
            const foundCart = await CartModel.findOne({ userID });

            // If the cart does not exist, create one
            if (!foundCart) {
                const newCart = new CartModel({ userID });
                newCart.items.push({
                    productID,
                    quantity: quantity
                });
                await newCart.save();
                return res.json({ status: true, data: newCart, message: "Cart created" });
            }

            // Check if the product already exists in the cart
            const productExists = foundCart.items.some(item => item.productID.toString() === productID);
            if (productExists) {
                return res.json({ status: false, message: "Product already exists in cart" });
            }

            // If the product does not exist in the cart, add it
            foundCart.items.push({ productID, quantity: quantity });
            await foundCart.save();

            // Populate the items.productID to get the full product details
            const updatedCart = await foundCart.populate("items.productID")
            ;

            return res.json({ status: true, data: updatedCart.items, message: "Cart item added" });

        } catch (e) {
            return res.json({ status: false, message: e.message });
        }
    },


    removeCart: async function (req, res) {
        try {
            const { userID, productID } = req.params;

            // Check if productID is a valid ObjectId
            if (!mongoose.isValidObjectId(productID)) {
                return res.json({ status: false, message: "Invalid productID" });
            }

            const updateCart = await CartModel.findOneAndUpdate(
                { userID },
                { $pull: { items: { productID: productID } } },
                { new: true }
            ).populate("items.productID");

            if (!updateCart) {
                return res.json({ status: false, message: "Cart not found" });
            }

            return res.json({ status: true, data: updateCart.items, message: "Cart Item removed" });

        } catch (e) {
            console.error(e);  // Log the error for debugging
            return res.json({ status: false, message: e.message });
        }
    }
};

module.exports = cartController;