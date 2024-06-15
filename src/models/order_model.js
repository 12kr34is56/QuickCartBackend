const { Schema, model } = require("mongoose");

const orderItemSchema = new Schema({

    product: { type: Map, required: true },
    quantity: { type: Number, default: 1 }

});

const orderSchema = new Schema({

    //mainly we need user details , created on and updated on feature
    user: { type: Map, required: true },
    items: { type: [orderItemSchema], default: [] },
    orderStatus: { type: String },
    createdOn: { type: Date },
    updatedOn: { type: Date },

});

// Pre-save middleware
orderSchema.pre("save", function (next) {
    this.createdOn = new Date();
    this.updatedOn = new Date();
    next();
});

// Pre-update middleware
orderSchema.pre(['update', 'findOneAndUpdate', 'updateOne'], function (next) {
    const update = this.getUpdate();
    delete update._id;
    this.updatedOn = new Date();
    next();
});

const orderModel = model('Order', orderSchema);

module.exports = orderModel;
