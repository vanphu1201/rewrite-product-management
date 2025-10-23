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
    createdBy: {
        account_id: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    deleted: {
        type: Boolean,
        default: false
    },
    slug: { type: String, slug: "title", unique: true}

});

const Product = mongoose.model('Product', schema, 'products');

module.exports = Product