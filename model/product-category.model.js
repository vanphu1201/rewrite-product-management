const mongoose = require('mongoose');
slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const schema = new mongoose.Schema({
    title: String,
    description: String,
    parent_id: {
        type: String,
        default: ""
    },
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
        type: Boolean,
        default: false
    },
    created_at: { type: Date, required: true, default: Date.now },
    slug: { type: String, slug: "title", unique: true}

});

const productCategory = mongoose.model('productCategory', schema, 'products-category');

module.exports = productCategory