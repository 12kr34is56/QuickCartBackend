const { ProductModel } = require("../models");
const ProductController = {

    createProduct: async function (req, res) {
        try {
            const productData = req.body;
            const newProduct = new ProductModel(productData);
            await newProduct.save();
            return res.json({ status: true, data: newProduct, message: "Product create" });
        } catch (e) {
            return res.json({ status: false, message: e });
        }
    },
    fetchAllProduct: async function (req, res) {
        try {
            const products = await ProductModel.find();
            return res.json({ status: true, data: products });
        } catch (e) {
            return res.json({ status: false, message: e });
        }
    },
    fetchOneProduct: async function (req, res) {
        try {
            const products = await ProductModel.findById(req.params.id);
            return res.json({ status: true, data: products });
        } catch (e) {
            return res.json({ status: false, message: e });
        }
    },
};

module.exports = ProductController;