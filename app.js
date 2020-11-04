const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const ejs = require('ejs');
const connectDB = require('./config/db');
const expressLayouts = require('express-ejs-layouts');

//Load config dotenv
dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

if (process.env.NODE_ENV === ' development') {
    app.use(morgan('dev'));
}

//Routes
app.use('/', require('./routes/index'));

app.use(expressLayouts);
app.set('layout', './layouts/layout');
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port: ${PORT}`));