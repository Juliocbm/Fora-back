'use strict'

var express = require('express');
var ViajesController = require('../controllers/viaje.controller');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');


//EXPRESS.ROUTER."ACCIÓN"("/RUTA","MIDDLEWARE CUANDO SE QUIERA","ACCIÓN DEL CONTROLADOR A REALIZAR")
//GET
api.get('/pruebas-viaje',ViajesController.pruebas);//RUTA DE PRUEBA
api.get('/seccion-viajes',ViajesController.getViajes);//OBTENER TODOS LOS VIAJE
api.get('/admin-viajes/:page?',[md_auth.ensureAuth,md_admin.isAdmin],ViajesController.getViajesAdmin);//OBTENER TODAS LOS VIAJE DE FORMA PAGINADA PARA EL ADMINISTRADOR
api.get('/viajes/:page?',ViajesController.getViajesUsers);//OBTENER TODAS LOS VIAJE DE FORMA PAGINADA PARA EL USUARIO

api.get('/viaje/:id',ViajesController.getViaje);//OBTENER UN VIAJE ESPECIFICO

//POST
api.post('/add-viaje',ViajesController.crearViaje);//GUARDAR UNA NUEVO VIAJE
//DELETE
api.delete('/viaje/:id',[md_auth.ensureAuth,md_admin.isAdmin] ,ViajesController.deleteViaje);//ELIMINAR VIAJE

api.put('/upd-viaje/:id',md_auth.ensureAuth,ViajesController.updateViaje); //ACTUALIZACIÓN DE VIAJE

module.exports = api;

