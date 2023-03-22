const mongoose = require('mongoose');
const {connection} = require("mongoose");
const { Schema } = mongoose;

const wishlistSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = (connection) => connection.model('wishlist', wishlistSchema);