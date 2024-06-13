const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    nameOfProduct: {
        type: String,
        required: [true, "Name is required"]
    },
    brandOfProduct: {
        type: String,
        required: [true, "Brand is required"]
    },
    vendorName: {
        type: String,
        required: [true, "Vendor name is required"]
    },
    priceOfProduct: {
        type: [{
            marketPrice: { type: Number, required: [true, "Market price is required"] },
            discountPrice: { type: Number, required: [true, "Discount price is required"] },
            priceAfterDiscount: { type: Number, required: [true, "Price after discount is required"] }
        }],
        required: true
    },
    ratingOfProduct: {
        type: [{
            userId: { type: Schema.Types.ObjectId, ref: 'User' },
            rating: { type: Number, min: 1, max: 5 }
        }],
        default: []
    },
    availabilityOfProduct: {
        type: Number,
        required: [true, "Enter the quantity"]
    },
    modelName: {
        type: String,
        required: [true, "Model name is required"]
    },
    imageOfProduct: {
        type: [String],
        required: [true, "Image is required"]
    },
    category: {
        type:String,
        required: [true, 'Category is required']
    },
    productFeature: {
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

// Pre-save hook to set `createdOn` and `updatedOn`
productSchema.pre('save', function (next) {
    const now = new Date();
    this.updatedOn = now;
    if (!this.createdOn) {
        this.createdOn = now;
    }
    next();
});

// Pre-update hook to update `updatedOn`
productSchema.pre(['updateOne', 'findOneAndUpdate', 'update'], function (next) {
    this.set({ updatedOn: new Date() });
    next();
});

const productModel = model('Product', productSchema);

module.exports = productModel;
