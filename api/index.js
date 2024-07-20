var express = require('express')
const bodyParser = require('body-parser');
var dotenv = require("dotenv");
var cookieParser = require("cookie-parser");

var authUser = require('./routes/authUser')
var userRoutes = require("./routes/userRoutes")
var inputRoutes = require("./routes/inputRoutes")

require('dotenv').config();

const app = express()

app.use(express.json())
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', userRoutes)
app.use('/api', authUser)
app.use('/api/input',inputRoutes)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || "Internal server error";
    return res.status(statusCode).json({
        success: false,
        errorMessage,
        statusCode
    })
})


app.listen(3000, (data, err) => {
    if (err) { console.log('error aii') }
    else { console.log('Subh Suruvat'); }
})