const { Schema, model } = require("mongoose");

// Order Item Schema
const orderItemSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 }
});

// Order Schema
const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: { type: [orderItemSchema], default: [] },
    orderStatus: { type: String },
    createdOn: { type: Date },
    updatedOn: { type: Date }
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
