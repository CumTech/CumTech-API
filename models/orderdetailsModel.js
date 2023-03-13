const mongoose = require('mongoose');
const {connection} = require("mongoose");
const { Schema } = mongoose;

const orderdetailsSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'order'
    }
});

console.log('Order Details model loaded');

module.exports = (connection) => connection.model('orderdetails', orderdetailsSchema);