// Description: Archivo principal de la aplicación
//-----------------Imports-----------------//
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//-----------------App-----------------//
const app = express();

//-----------------Middlewares-----------------//
app.use(bodyParser.json());
app.use(cors())

//-----------------Routes-----------------//
const addressRoute = require('./routes/addressRoute');
const categoryRoute = require('./routes/categoryRoute');
const loginRoute = require("./routes/loginRoutes");
const registerRoute = require("./routes/registerRoutes");
const orderDetailRoute = require('./routes/orderdetailRoute');
const orderRoute = require('./routes/orderRoute');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const wishlistRoute = require('./routes/wishlistRoute');
const authenticator = require("./auth")

//-----------------consumo de rutas-----------------//
app.use("/address", addressRoute);
app.use("/category", categoryRoute);
app.use("/orderdetail", orderDetailRoute);
app.use("/order", orderRoute);
app.use("/product", productRoute);
app.use("/user", authenticator, userRoute);
app.use("/wishlist", wishlistRoute);
app.use("/login", loginRoute);
app.use("/register", registerRoute);

//-----------------Ruta raíz-----------------//
app.get("/", (req, res) => {
    res.send("Bienvenido a la API de Ecommerce de la app CumTech");
});


//-----------------Servidor-----------------//
app.listen(9000, () => {
    console.log('Server running on port 9000');
});

module.exports = app;
