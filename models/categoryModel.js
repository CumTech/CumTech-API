const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
        default: function () {
            return `no given description of the category ${this.name}`;
        }
    }
});

module.exports = (connection) => connection.model('category', categorySchema);