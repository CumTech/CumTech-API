const mongoose = require('mongoose');
const {connection} = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    urlImage: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});

console.log('Product model loaded');

module.exports = (connection) => connection.model('product', productSchema);