const express = require('express');
const {Router} = express;
const mongoose = require('mongoose');
const CategoryModelCreator = require('../models/categoryModel');
const routes = Router();
const urlDB = process.env.MONGODB_URI;
// const urlDB = "mongodb+srv://LurchingDart:relampago81@cumdata.z4azfea.mongodb.net/shop"


routes.get('/', async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const CategoryModel = CategoryModelCreator(connection);
        const data = await CategoryModel.find();
        res.json(data);
        connection.close();
    } catch (error) {
        connection.close();
        res.status(500);
        res.json({error: error.message});
    }
});

routes.get('/:id', async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const CategoryModel = CategoryModelCreator(connection);
        const data = await CategoryModel.findOne({_id: req.params.id});
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
        const CategoryModel = CategoryModelCreator(connection);
        const category = new CategoryModel(req.body);
        const data = await category.save();
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
        const CategoryModel = CategoryModelCreator(connection);
        const data = await CategoryModel.findOneAndDelete(req.params.id);
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
        const CategoryModel = CategoryModelCreator(connection);
        const data = await CategoryModel.findOneAndUpdate(req.params.id, req.body);
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