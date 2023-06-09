const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderdetailSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'order'
    }
});

module.exports = (connection) => connection.model('orderdetail', orderdetailSchema);