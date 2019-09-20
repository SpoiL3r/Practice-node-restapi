const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//mongoose.connect('mongodb+srv://SpoiL3r:qwerty123@cluster0-0blze.mongodb.net/test?retryWrites=true&w=majority',{
 //   useMongoClient = true
//});

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Routes handling requests
app.use('/products', productRoutes); 
app.use('/orders', orderRoutes); 

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);

})
    
app.use ((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;