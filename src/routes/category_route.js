const categoryRouter = require("express").Router();
const { CategoryController } = require('../controllers');

categoryRouter.post('/', CategoryController.createCategory);
categoryRouter.get('/', CategoryController.findAllCategory);
categoryRouter.get('/:id', CategoryController.findOneCategory);

module.exports = categoryRouter;
