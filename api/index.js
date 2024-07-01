const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const CookieParser = require('cookie-parser');
require('dotenv').config();

const authRoute = require("./Routes/AuthRoute");
const productsRoute = require("./Routes/ProductsRoute");
const ordersRoute = require("./Routes/OrdersRoute");

app.use(express.json());
app.use(CookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
mongoose.connect(process.env.MONGO_URL);


app.use("/", authRoute);
app.use("/", productsRoute);
app.use("/", ordersRoute);
app.use('/uploads', express.static('uploads'));



 
app.listen(4000); 