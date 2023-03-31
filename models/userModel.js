const mongoose = require('mongoose');
const validator = require('validator'); // https://www.npmjs.com/package/validator


const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        default: undefined
    },
    age: {
        type: Number,
        default: undefined
    },
    username: {
        type: String,
        unique: true,
        default: undefined
    },
    email: { 
        type: String, 
        unique: true,
        lowercase: true, 
        trim: true, 
        index: true, 
        required:true,
        validate:{
            validator: function(v){
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
            },
            message: props => `${props.value} is not a valid email address`
        }
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'address',
        default: undefined
    },
});

module.exports = (connection) => connection.model('user', userSchema);
