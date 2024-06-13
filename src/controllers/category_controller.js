const categoryModel = require("./../models/category_model");

const CategoryController = {

    createCategory: async function (req, res) {
        try {
            const categoryData = req.body;
            const newCategory = new categoryModel(categoryData);
            await newCategory.save();
            return res.json({ status: true, data: newCategory, message: "Category create" });


        } catch (e) {
            return res.json({ status: false, message: e });
        }
    },

    findAllCategory: async function (req, res) {
        try {

            const categories = await categoryModel.find();
            return res.json({ status: true, data: categories });


        } catch (e) {
            return res.json({ status: false, message: e });
        }
    },
    findOneCategory: async function (req, res) {
        try {
            const categories = await categoryModel.findById(req.params.id);
            return res.json({ status: true, data: categories });


        } catch (e) {
            return res.json({ status: false, message: e });
        }
    }


};

module.exports = CategoryController;