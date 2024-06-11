const ProductModel = require("../models/product_model");

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
            const categoryId = req.params.id;
            const products = await ProductModel.find({ category: categoryId });
            return res.json({ status: true, data: products });
        } catch (e) {
            return res.json({ status: false, message: e });
        }
    },
};

module.exports = ProductController;