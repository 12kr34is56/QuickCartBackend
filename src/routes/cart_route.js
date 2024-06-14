const cartRouter = require("express").Router();
const CartController = require("./../controllers/cart_controller");


cartRouter.get('/:user', CartController.fetchCart);
cartRouter.post('/', CartController.createCart);
cartRouter.delete('/', CartController.removeCart);

module.exports = cartRouter;

//this is route and i will revert this 