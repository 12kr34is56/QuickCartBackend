const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    productName: {
        type: String,
        required: [true, "Name is required"]
    },
    brandName: {
        type: String,
        required: [true, "Brand is required"]
    },
    vendorName: {
        type: String,
        required: [true, "Vendor name is required"]
    },
    price: {
        type: {
            marketPrice: { type: Number, required: [true, "Market price is required"] },
            discountPrice: { type: Number, required: [true, "Discount price is required"] },
            priceAfterDiscount: { type: Number, required: [true, "Price after discount is required"] }
        },
        required: true
    },
    ratings: {
        type: [{
            userId: { type: Schema.Types.ObjectId, ref: 'User' },
            rating: { type: Number, min: 1, max: 5 }
        }],
        default: []
    },
    availability: {
        type: Number,
        required: [true, "Enter the quantity"]
    },
    modelName: {
        type: String,
        required: [true, "Model name is required"]
    },
    images: {
        type: [String],
        required: [true, "Image is required"]
    },
    category: {
        type:String,
        required: [true, 'Category is required']
    },
    productFeatures: {
        type: [String],
        default: []
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    updatedOn: {
        type: Date,
        default: Date.now
    }
});

// Pre-update hook to update `updatedOn`
productSchema.pre(['updateOne', 'findOneAndUpdate', 'update'], function (next) {
    this.set({ updatedOn: new Date() });
    next();
});

const productModel = model('Product', productSchema);

module.exports = productModel;
