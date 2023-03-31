const express = require('express');
const {Router} = express;
const mongoose = require('mongoose');
const AddressModelCreator = require('../models/addressModel');
const UserModelCreator = require('../models/userModel');
const routes = Router();
// const urlDB = process.env.MONGODB_URI;
const urlDB = "mongodb+srv://LurchingDart:relampago81@cumdata.z4azfea.mongodb.net/shop"

//-----------------Métodos-----------------//

//Método para un get
routes.get("/", async(req, res) => {
    const connection = await mongoose.createConnection(urlDB)
    try {
        const AddressModel = AddressModelCreator(connection);
        const data = await AddressModel.find();
        res.json(data);
        connection.close();
    } catch (error) {
        connection.close();
        res.status(500);
        res.json({error: error.message});
    }
});

//Método para un get de un elemento
routes.get("/address/:id", async(req, res) => {
    const connection = await mongoose.createConnection(urlDB)
    try {
        const AddressModel = AddressModelCreator(connection);
        const data = await AddressModel.findOne({_id: req.params.id});
        res.json(data);
        connection.close();
    } catch (error) {
        connection.close();
        res.status(500);
        res.json({error: error.message});
    }
});

//Método para un post
routes.post("/", async(req, res) => {
    const connection = await mongoose.createConnection(urlDB)
    try {
        const AddressModel = AddressModelCreator(connection);
        const address = new AddressModel(req.body);
        const data = await address.save();
        res.json(data);
        connection.close();
    } catch (error) {
        connection.close();
        res.status(500);
        res.json({error: error.message});
    }
});

routes.post("/update/address-of-user", async(req, res) => {
    const connection = await mongoose.createConnection(urlDB)
    try {
        const AddressModel = AddressModelCreator(connection);
        const address = new AddressModel(req.body);
        const data = await address.save();
        res.json(data);
        connection.close();
    } catch (error) {
        connection.close();
        res.status(500);
        res.json({error: error.message});
    }
});


//Método para un delete
routes.delete("/:id", async(req, res) => {
    const connection = await mongoose.createConnection(urlDB)
    try {
        const AddressModel = AddressModelCreator(connection);
        const data = await AddressModel.findByIdAndDelete(req.params.id);
        res.json(data);
        connection.close();
    } catch (error) {
        connection.close();
        res.status(500);
        res.json({error: error.message});
    }
});

//Método para un put
routes.put("/:id", async(req, res) => {
    const connection = await mongoose.createConnection(urlDB)
    try {
        const AddressModel = AddressModelCreator(connection);
        const data = await AddressModel.updateOne({_id: req.params.id}, req.body);
        res.json(data);
        connection.close();
    } catch (error) {
        connection.close();
        res.status(500);
        res.json({error: error.message});
    }
});

module.exports = routes;