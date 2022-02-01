const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    name: { type: String },
    description: { type: String },
    sku: { type: String },
    stock: { type: Number },
    category: { type: String },
    price: { type: Number },
    image_url: { type: String }
})

module.exports = mongoose.model('product', PostSchema)