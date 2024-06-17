const cartRouter = require("express").Router();
const CartController = require("./../controllers/cart_controller");
cartRouter.get('/:userID', CartController.fetchCart);
cartRouter.post('/:userID', CartController.createCart);
cartRouter.delete('/:userID/:productID', CartController.removeCart);

module.exports = cartRouter;