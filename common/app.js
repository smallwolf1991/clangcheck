let globalNS = require('./define_prop_global.js');

var express = require('express');
var ejs = require('ejs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var timeout = require('connect-timeout');
var session = require('express-session');


var router = require('../routes/index');

var app = express();

app.use(timeout(100 * 1000, {respond: false}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    key: "clang-sid",
    secret: 'HdVWOPn2wpTrmWahSuS5ftVgwUtEfBkJ',
    resave: true,
    saveUninitialized: true,
    cookie: {secure: false, maxAge: 30 * 24 * 3600 * 1000, path: '/', httpOnly: false, /* domain: '*'*/}
}));
app.use(async (req, res, next) => {
    if (!req.session.user) {
        req.session.user = {};
    }

    req.user = req.session.user;
    app.locals.req = req;
    next();
});

app.use('/clang', router);


// catch 404 and forward to error handler
app.use(SM.co(async (req, res, next) => {
    res.status(404);
    throw new SM.Exception(SM.errors.ERROR_NOT_PAGE);
}));

module.exports = app;
