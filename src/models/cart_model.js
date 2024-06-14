const { Schema, model } = require("mongoose");


const cartItemSchema = new Schema({

    productID: { type: Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, default: 1 }

});

const cartSchema = new Schema({
    
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [cartItemSchema], default: [] },
    createdOn: { type: Date },
    updatedOn: { type: Date },

});

cartSchema.pre("save", function (next) {
    createdOn = new Date;
    updatedOn = new Date;

    next();
});

cartSchema.pre(['update', 'findOneAndUpdate', 'updateOne'], function (next) {
    const update = this.getUpdate();
    delete update._id;
    this.updateOn = new Date();

    next();
});

const cartModel = model('Cart', cartSchema);

module.exports = cartModel;