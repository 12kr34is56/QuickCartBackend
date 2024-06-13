const { ProductModel } = require("../models");
const ProductController = {

    createProduct: async function (req, res) {
        try {
            const productData = req.body;
            const newProduct = new ProductModel(productData);
            await newProduct.save();
            return res.json({ status: true, data: newProduct, message: "Product created" });
        } catch (e) {
            return res.json({ status: false, message: e });
        }
    },
    fetchAllProduct: async function (req, res) {
        try {
            const products = await ProductModel.find();
            return res.json({ status: true, data: products, message: "Fetched all products"});
        } catch (e) {
            return res.json({ status: false, message: e });
        }
    },
    fetchOneProduct: async function (req, res) {
        try {
            const categoryId = req.params.id;
            const products = await ProductModel.find({ category: categoryId });
            return res.json({ status: true, data: products, message: "Fetched one product"});
        } catch (e) {
            return res.json({ status: false, message: e });
        }
    },
    updateOneProduct: async (req, res) => {
        const { id } = req.params;
        const {
            productName,
            brandName,
            marketPrice,
            discountPrice,
            priceAfterDiscount,
            ratings,
            availability,
            modelName,
            images,
            category,
            productFeatures,
            description
        } = req.body;
    
        try {
            const updatedProduct = await productModel.findByIdAndUpdate(
                id,
                {
                    $set: {
                        productName,
                        brandName,
                        "price.marketPrice": marketPrice,
                        "price.discountPrice": discountPrice,
                        "price.priceAfterDiscount": priceAfterDiscount,
                        ratings,
                        availability,
                        modelName,
                        images,
                        category,
                        productFeatures,
                        description
                    }
                },
                { new: true } // Return the updated document
            );
    
            if (!updatedProduct) {
                return res.status(404).json({ message: "Product not found" });
            }
    
            res.status(200).json({ message: "Product updated", data: updatedProduct });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteOneProduct: async (req, res) => {
        const { id } = req.params;
    
        try {
            const deletedProduct = await ProductModel.findByIdAndDelete(id);
    
            if (!deletedProduct) {
                return res.status(404).json({ message: "Product not found" });
            }
    
            res.json({ message: "Product deleted" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = ProductController;