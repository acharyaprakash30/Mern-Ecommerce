const express = require('express');
var bodyParser = require('body-parser')
const errorMiddleware = require("./middleware/error");
const app = express();
const cookieParser = require('cookie-parser');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cookieParser())

//route import
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
app.use('/api/v1',product);
app.use('/api/v1',user)

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;