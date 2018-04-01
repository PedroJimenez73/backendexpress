var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var proveedor = require('./routes/proveedor');
var usuario = require('./routes/usuario');
var login = require('./routes/login');



var app = express();

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/appcompras', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('conectado a la base de datos'))
  .catch((err) => console.error(err));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use('/proveedor', proveedor);
app.use('/usuario', usuario);
app.use('/login', login);



app.use(function(req, res, next) {
  var err = new Error('Error 404 recurso no encontrado');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
