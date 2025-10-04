const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
        type: Boolean,
        default: false
    },
    created_at: { type: Date, required: true, default: Date.now }

});

const Product = mongoose.model('Product', schema, 'products');

module.exports = Product