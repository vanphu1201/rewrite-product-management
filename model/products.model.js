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
    deleted: Boolean
});

const Product = mongoose.model('Product', schema, 'products');

module.exports = Product