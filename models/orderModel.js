const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    total: {
        type: Number,
        required: true
    },
    items: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    status: {
        type: String,
        default: 'pending',
        required: true
    }
});

module.exports = (connection) => connection.model('order', orderSchema);
