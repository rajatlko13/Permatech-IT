const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');

mongoose.connect(process.env.URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
const con = mongoose.connection

con.on('open', () => {
    console.log("DB Connection successful...");
})

con.on('error', () => {
    console.log("DB connection failed...");
})

const app = express();
app.use(cors());
app.use(express.json());

app.listen(process.env.PORT,() => {
    console.log('Listening on Port',process.env.PORT);
});

app.use('/api/customer', customerRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/product', productRoutes);
