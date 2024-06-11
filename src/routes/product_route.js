const productRouter = require('express').Router();

const ProductController = require('../controllers/product_controller');

productRouter.post('/', ProductController.createProduct);
productRouter.get('/', ProductController.fetchAllProduct);
productRouter.get('/:id', ProductController.fetchOneProduct);

module.exports = productRouter;