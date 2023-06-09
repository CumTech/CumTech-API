const express = require('express');
const {Router} = express;
const mongoose = require('mongoose');
const OrderDetailModelCreator = require('../models/orderdetailModel');
const routes = Router();
// const urlDB = process.env.MONGODB_URI;
const urlDB = "mongodb+srv://LurchingDart:relampago81@cumdata.z4azfea.mongodb.net/shop"

routes.get('/', async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const OrderDetailModel = OrderDetailModelCreator(connection);
        const data = await OrderDetailModel.find();
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
        const OrderDetailModel = OrderDetailModelCreator(connection);
        const data = await OrderDetailModel.findOne({_id: req.params.id});
        res.json(data);
        connection.close();
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({error: 'Internal server error'});
        res.json({message: error.message})
    }
});

routes.get('/user/:userId', async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const OrderDetailsModel = OrderDetailsModelCreator(connection);
        const orderDetails = await OrderDetailsModel.find()
            .populate({
                path: 'order',
                match: { user: req.params.userId }
            })
            .exec();
        const filteredOrderDetails = orderDetails.filter(od => od.order !== null);
        res.json(filteredOrderDetails);
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
        const OrderDetailModel = OrderDetailModelCreator(connection);
        const OrderDetail = new OrderDetailModel(req.body);
        const data = await OrderDetail.save();
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
        const OrderDetailModel = OrderDetailModelCreator(connection);
        const data = await OrderDetailModel.findOneAndDelete(req.params.id);
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
        const OrderDetailModel = OrderDetailModelCreator(connection);
        const data = await OrderDetailModel.findOneAndUpdate(req.params.id, req.body);
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
