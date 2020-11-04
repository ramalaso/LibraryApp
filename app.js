const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const session = require('express-session');
const app = express();
const path = require('path');

//Passport config
require('./config/passport')(passport);

app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

//Sessions
app.use(session({
    secret: 'ramalaso',
    resave: false,
    saveUninitialized: false
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static Files
app.use(express.static('public'));

//Load config dotenv
dotenv.config({ path: './config/config.env' });

connectDB();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port: ${PORT}`));