// Description: Archivo principal de la aplicación
//-----------------Imports-----------------//
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const htpp = require('http');

//-----------------App-----------------//
const app = express();

//-----------------Middlewares-----------------//
app.use(bodyParser.json());
app.use(cors())

//-----------------Routes-----------------//
const addressRoute = require('./routes/addressRoute');
const categoryRoute = require('./routes/categoryRoute');
const loginRoute = require("./routes/loginRoute");
const registerRoute = require("./routes/registerRoute");
const orderDetailRoute = require('./routes/orderdetailRoute');
const orderRoute = require('./routes/orderRoute');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const wishlistRoute = require('./routes/wishlistRoute');
const authenticator = require("./auth")

//-----------------consumo de rutas-----------------//
app.use("/addresses", addressRoute);
app.use("/categories", categoryRoute);
app.use("/orderdetails", orderDetailRoute);
app.use("/orders", orderRoute);
app.use("/products", productRoute);
app.use("/users", authenticator, userRoute);
app.use("/wishlists", wishlistRoute);
app.use("/login", loginRoute);
app.use("/register", registerRoute);

//-----------------Ruta raíz-----------------//
app.get("/", (req, res) => {
    res.send("Welcome to the API of CumData the best shop in the world");
});


//-----------------Servidor-----------------//
const server = htpp.createServer(app);
// app.listen(9000, () => {
//     console.log('Server running on port 9000');
// });
server.listen(9000, () => {
    console.log('Server running on port 9000');
});

module.exports = app;
