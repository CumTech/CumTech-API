const express = require('express');
const {Router} = express;
const mongoose = require('mongoose');
const OrderModelCreator = require('../models/orderModel');
const routes = Router();
const urlDB = process.env.MONGODB_URI;

routes.get('/', async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const OrderModel = OrderModelCreator(connection);
        const data = await OrderModel.find();
        res.json(data);
        connection.close();
    } catch (error) {
        console.log(error);
        connection.close();
        res.status(500);
        res.json({error: 'Internal server error'});
        res.json({error: error.message});
    }
});

routes.get('/:id', async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const OrderModel = OrderModelCreator(connection);
        const data = await OrderModel.findOne({_id: req.params.id});
        res.json(data);
        connection.close();
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({error: 'Internal server error'});
        res.json({message: error.message})
    }
});

routes.post('/', async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const OrderModel = OrderModelCreator(connection);
        const order = new OrderModel(req.body);
        const data = await order.save();
        res.json(data);
        connection.close();
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({error: 'Internal server error'});
        res.json({message: error.message})
    }
});

routes.delete('/:id', async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try{
        const OrderModel = OrderModelCreator(connection);
        const data = await OrderModel.findOneAndDelete(req.params.id);
        res.json(data);
        connection.close();
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({error: 'Internal server error'});
        res.json({message: error.message})
    }
});

routes.put('/:id', async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const OrderModel = OrderModelCreator(connection);
        const data = await OrderModel.findOneAndUpdate(req.params.id, req.body);
        res.json(data);
        connection.close();
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({error: 'Internal server error'});
        res.json({message: error.message})
    }
});

module.exports = routes;