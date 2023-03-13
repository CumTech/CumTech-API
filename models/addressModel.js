const mongoose = require('mongoose');
const {connection} = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema({
    street: {
        type: String,
        required: true
    },
    exteriorNumber: {
        type: Number,
        required: true
    },
    interiorNumber: {
        type: Number,
        required: false
    },
    secondStreet: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    zipCode: {
        type: Number,
        required: true
    }
});

console.log('Address model loaded');

module.exports = (connection) => connection.model('address', addressSchema);