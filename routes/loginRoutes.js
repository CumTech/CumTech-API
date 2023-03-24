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
        const { email, password } = req.body;
        let user = await UserModel.findOne({ "email": email });
        
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        if (password === user.password) {
            const token = jwt.sign(
                { _id: user._id, email },
                jwt_token,
                {
                    expiresIn: "2h",
                }
            );
            user = {...user._doc,token};
            res.status(200).json(user);
        }
        else {
            res.status(400).send("Invalid Credentials");
        }
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
});

module.exports = routes;