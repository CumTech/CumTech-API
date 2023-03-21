// Description: Archivo principal de la aplicación
//-----------------Imports-----------------//
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//-----------------App-----------------//
const app = express();

//-----------------Middlewares-----------------//
app.use(bodyParser.json());

//-----------------Routes-----------------//
const addressRoute = require('./routes/addressRoute');
const categoryRoute = require('./routes/categoryRoute');
const orderDetailRoute = require('./routes/orderDetailRoute');
const orderRoute = require('./routes/orderRoute');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const wishlistRoute = require('./routes/wishlistRoute');

//-----------------consumo de rutas-----------------//
app.use("/address", addressRoute);
app.use("/category", categoryRoute);
app.use("/orderdetail", orderDetailRoute);
app.use("/order", orderRoute);
app.use("/product", productRoute);
app.use("/user", userRoute);
app.use("/wishlist", wishlistRoute);


app.get("/", (req, res) => {
    res.send("Bienvenido a la API de Ecommerce");
});
//-----------------Servidor-----------------//
app.listen(3000, () => {
    console.log('Server running on port 9000');
});

module.exports = app;
