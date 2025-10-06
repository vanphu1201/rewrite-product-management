const mongoose = require('mongoose');
slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
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
    created_at: { type: Date, required: true, default: Date.now },
    slug: { type: String, slug: "title", unique: true }

});

const Product = mongoose.model('Product', schema, 'products');

module.exports = Product