const CartModel = require('./../models/cart_model');

const cartController = {


    fetchCart: async function (req, res) {
        try {
            const user = req.params.user;
            const foundData = await CartModel.findOne({ user: user }).populate("items.product");
            if (!foundData) {
                return res.json({ status: true, data: [] });
            }
            return res.json({ status: true, data: foundData.items });

        } catch (e) {
            return res.json({ status: false, message: e });
        }

    },

    createCart: async function (req, res) {
        try {
            const { user, product, quantity } = req.body;
            //check if cart exist
            const foundCart = await CartModel.findOne({ user: user });
            //if not exist
            if (!foundCart) {
                //then we will create one by user id
                const newCart = new CartModel({ user: user });
                newCart.items.push({
                    product: product,
                    quantity: quantity
                });
                //now save the data
                await newCart.save();
                return res.json({ status: true, data: newCart, message: "Cart created" });
            }

            //if cart exist and product too --> then find the user and product is same then update
            await CartModel.findOneAndUpdate(
                { user: user, "items.product": product },
                { $pull: { items: { product: product } } },
                { new: true }
            );

            //if cart exist --> then find the user is same then update
            const updatedCart = await CartModel.findOneAndUpdate(
                { user: user },
                { $push: { items: { product: product, quantity: quantity } } },
                { new: true }
            ).populate("items.product");

            return res.json({ status: true, data: updatedCart.items, message: "Cart Item added" });

        } catch (e) {
            return res.json({ status: false, message: e });
        }
    },

    removeCart: async function (req, res) {
        try {

            const { user, product } = req.body;
            const updateCart = await CartModel.findOneAndUpdate(
                { user: user },
                { $pull: { items: { product: product } } },
                { new: true }
            ).populate("items.product");
            return res.json({ status: true, data: updateCart.items, message: "Cart Item remove" });

        } catch (e) {
            return res.json({ status: false, message: e });
        }

    }

};

module.exports = cartController;