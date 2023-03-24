const express = require("express");
const { Router } = express;
const mongoose = require("mongoose")
const UserModelCreator = require("../model/userModel")
const routes = Router();
const dburl = "mongodb://127.0.0.1:27017/prueba1";
const jwt = require("jsonwebtoken");
const jwt_token = "TOKEN";

routes.post("/", async (req, res) => {
    const connection = await mongoose.createConnection(dburl);
    try {
        const UserModel = UserModelCreator(connection);
        const { name, email, password } = req.body;

        // Validate user input
        if (!(name && email && password)) {
            res.status(400).send("All input are required");
        }

        let data = await UserModel.findOne({ "email": req.body.email });

        if (data) {
            res.status(409).send("User Already Exist. Please Login");
        }
        else {
            let user = new UserModel(req.body);
            data = await user.save();
            const token = jwt.sign(
                { _id: user._id, email },
                jwt_token,
                {
                    expiresIn: "2h",
                }
            );
            user = {...user._doc,token};
            res.json(user);
            connection.close();
        }
    } catch (error) {
        console.log(error)
        connection.close();
        res.status(500);
        res.json({ message: "error", error: error });
    }
});

module.exports = routes