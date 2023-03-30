const mongoose = require('mongoose');
const { Schema } = mongoose;

const wishlistSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'products'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = (connection) => connection.model('wishlist', wishlistSchema);
