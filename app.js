'use strict'

//Cargamos las dependencias
var express = require('express');
var bodyParser = require('body-parser');

//Cargamos el framework de express
var app = express();

//Cargamos las rutas
var user_routes = require('./routes/user.route');
var viaje_routes = require('./routes/viaje.route');


//Middlewares de body-parser
var jsonParser       = bodyParser.json({limit:1024*1024*20, type:'application/json'});
  var urlencodedParser = bodyParser.urlencoded({ extended:true,limit:1024*1024*20,type:'application/x-www-form-urlencoding' })

  app.use(jsonParser);
  app.use(urlencodedParser);


//Configurar cabeceras y cors
//ESTO PERMITE LA COMUNICACION CON AJAX
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Ruta base
//Si no quiero un prefijo simplemente cargo '/'
app.use('/api',user_routes);
app.use('/api',viaje_routes);

module.exports = app;
