const cartRouter = require("express").Router();
const CartController = require("./../controllers/cart_controller");
cartRouter.get('/:userID', CartController.fetchCart);
cartRouter.post('/:userID', CartController.createCart);
cartRouter.delete('/', CartController.removeCart);
console.log("cart_route.js has been executed.");

module.exports = cartRouter;