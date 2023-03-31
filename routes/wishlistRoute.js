const express = require('express');
const {Router} = express;
const mongoose = require('mongoose');
const WishlistModelCreator = require('../models/wishlistModel');
const UserModelCreator = require('../models/userModel');
const ProductModelCreator = require('../models/productModel');
const routes = Router();
const urlDB = process.env.MONGODB_URI;
// const urlDB = "mongodb+srv://LurchingDart:relampago81@cumdata.z4azfea.mongodb.net/shop"


routes.get('/', async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const WishlistModel = WishlistModelCreator(connection);
        const data = await WishlistModel.find();
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
        const WishlistModel = WishlistModelCreator(connection);
        const data = await WishlistModel.findOne({_id: req.params.id});
        res.json(data);
        connection.close();
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({error: 'Internal server error'});
        res.json({message: error.message})
    }
});

routes.get('/user/:userID', async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const WishlistModel = WishlistModelCreator(connection);
        const data = await WishlistModel.find({ "user": req.params.userID});
        res.json(data);
        connection.close();
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({error: 'Internal server error'});
        res.json({message: error.message})
    }
});

routes.get('/user/products/:userID', async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const UserModel = UserModelCreator(connection);
        const ProductModel = ProductModelCreator(connection);
        const WishlistModel = WishlistModelCreator(connection);
        const data = await WishlistModel.find({ "user": req.params.userID}).populate("product");
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
        const WishlistModel = WishlistModelCreator(connection);
        const wishlist = new WishlistModel(req.body);
        const data = await wishlist.save();
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
        const WishlistModel = WishlistModelCreator(connection);
        const data = await WishlistModel.findOneAndDelete(req.params.id);
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
        const WishlistModel = WishlistModelCreator(connection);
        const data = await WishlistModel.findOneAndUpdate(req.params.id, req.body);
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
