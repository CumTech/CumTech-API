const mongoose = require('mongoose');
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
    urlImage: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: false,
        default: 0,
    },
    description: {
        type: String,
        required: false,
        default: undefined,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: false,
        default: undefined,
    },
});

module.exports = (connection) => connection.model('product', productSchema);