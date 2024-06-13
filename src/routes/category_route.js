const CategoryController = require("../controllers/category_controller");
const categoryRouter = require("express").Router();

categoryRouter.post('/', CategoryController.createCategory);
categoryRouter.get('/', CategoryController.findAllCategory);
categoryRouter.get('/:id', CategoryController.findOneCategory);

module.exports = categoryRouter;
