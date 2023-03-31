const express = require('express');
const {Router} = express;
const mongoose = require('mongoose');
const UserModelCreator = require('../models/userModel');
const routes = Router();
const urlDB = process.env.MONGODB_URI;
// const urlDB = "mongodb+srv://LurchingDart:relampago81@cumdata.z4azfea.mongodb.net/shop"


routes.get('/', async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const UserModel = UserModelCreator(connection);
        const data = await UserModel.find();
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
        const UserModel = UserModelCreator(connection);
        const data = await UserModel.findOne({_id: req.params.id});
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
        const UserModel = UserModelCreator(connection);
        const user = new UserModel(req.body);
        const data = await user.save();
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
        const UserModel = UserModelCreator(connection);
        const data = await UserModel.findOneAndDelete(req.params.id);
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
        const UserModel = UserModelCreator(connection);
        const data = await UserModel.findOneAndUpdate(req.params.id, req.body);
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