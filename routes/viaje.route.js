'use strict'

var express = require('express');
var ViajesController = require('../controllers/viaje.controller');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');


//EXPRESS.ROUTER."ACCIÓN"("/RUTA","MIDDLEWARE CUANDO SE QUIERA","ACCIÓN DEL CONTROLADOR A REALIZAR")
//GET
api.get('/pruebas-viajes',ViajesController.pruebas);//RUTA DE PRUEBA
api.get('/viajes',ViajesController.getViajes);//OBTENER TODOS LOS viajeS


//POST
api.post('/add-viaje',md_auth.ensureAuth,ViajesController.crearViaje);//GUARDAR UNA NUEVO VIAJE
api.post('/add-direccion',md_auth.ensureAuth,ViajesController.crearDireccion);//GUARDAR UNA NUEVO VIAJE

module.exports = api;
