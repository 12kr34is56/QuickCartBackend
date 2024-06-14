const CartModel = require('./../models/cart_model');

const cartController = {
    fetchCart: async function (req, res) {
        try {
            const userID = req.params.userID;
            // const foundData = await CartModel.findOne({ userID }).populate("items.productID");
            const foundData = await CartModel.findOne({ userID });
            if (!foundData) {
                return res.json({ status: true, data: [] });
            }
            return res.json({ status: true, data: foundData });

        } catch (e) {
            return res.json({ status: false, message: e });
        }

    },

    createCart: async function (req, res) {
        try {
            const {userID} = req.params;
            const { productID, quantity } = req.body;
            
            //check if cart exist
            const foundCart = await CartModel.findOne({ userID });
            //if not exist
            if (!foundCart) {
                //then we will create one by user id
                const newCart = new CartModel({ userID });
                newCart.items.push({
                    productID,
                    quantity: quantity
                });
                //now save the data
                await newCart.save();
                return res.json({ status: true, data: newCart, message: "Cart created" });
            }

            //if cart exist --> then find the user is same then update
            const updatedCart = await CartModel.findOneAndUpdate(
                { userID },
                { $push: { items: { productID, quantity: quantity } } },
                { new: true }
            ).populate("items.productID");

            return res.json({ status: true, data: updatedCart.items, message: "Cart Item added" });

        } catch (e) {
            return res.json({ status: false, message: e });
        }
    },

    removeCart: async function (req, res) {
        try {

            const { userID, productID } = req.body;
            const updateCart = await CartModel.findOneAndUpdate(
                { userID },
                { $pull: { items: { productID } } },
                { new: true }
            ).populate("items.productID");
            return res.json({ status: true, data: updateCart.items, message: "Cart Item remove" });

        } catch (e) {
            return res.json({ status: false, message: e });
        }

    }

};

module.exports = cartController;