'use strict'

//MODELOS
var Viaje = require('../models/viaje.model'); //MODELO DE VIAJE
var Direccion = require('../models/direccion.model'); //MODELO DE DIRECCION
var Usuario = require('../models/user.model');

var mongoosePaginate = require('mongoose-pagination');

var path = require('path');
var fs = require('fs');
var moment = require('moment');

//ACCIONES
function pruebas(req, res) {
	res.status(200).send({
		message: 'Probando el controlador de viajes y la acción pruebas'
	});
} //pruebas


//FUNCIÓN PARA OBTENER TODAS LAS VIAJES (PIENSO QUE AQUÍ SE DEBERÍA DE LIMITAR LA CANTIDAD DE VIAJES QUE SE MUESTREN)
function getViajes(req, res) {
	Viaje.find({}).populate({
		path: 'direccionO'
	}).populate({path:'choferId'}).exec((err, viajes) => {
		if (err) {
			res.status(500).send({
				message: 'Error en la petición.'
			});
		} else if (viajes.length == 0) {
			res.status(404).send({
				message: 'No hay viajes.'
			});
		} else {
			res.status(200).send({
				viajes: viajes
			});
		}
	});
} //getviajes


//FUNCIÓN PARA OBTENER TODOS LOS VIAJES PAGINADAS PARA EL ADMINISTRADOR
function getViajesAdmin(req, res) {

	var page = 1;
	if (req.params.page) {
		page = req.params.page;
	}

	var itemsXpagina = 5;

	Viaje.find().sort('_id').paginate(page, itemsXpagina, (err, viajes, total) => {
		if (err) return res.status(500).send({
			message: 'Error en la petición'
		});
		if (!viajes) return res.status(404).send({
			message: 'No hay viajes'
		});

		return res.status(200).send({
			viajes: viajes,
			total: total,
			pages: Math.ceil(total / itemsXpagina)
		});
	});

} //getViajesAdmin



//FUNCIÓN PARA OBTENER TODAS LAS VIAJES PAGINADAS PARA EL USUARIO (FALTA FILTRARLO SOLO POR EL MES ACTUAL)
function getViajesUsers(req, res) {

	var page = 1;
	if (req.params.page) {
		page = req.params.page;
	}

	var itemsXpagina = 5;

	Viaje.find({
		status: true
	}).sort('_id').paginate(page, itemsXpagina, (err, viajes, total) => {
		if (err) return res.status(500).send({
			message: 'Error en la petición'
		});
		if (!viajes) return res.status(404).send({
			message: 'No hay viajes'
		});

		return res.status(200).send({
			viajes: viajes,
			total: total,
			pages: Math.ceil(total / itemsXpagina),
			itemsPorPagina: itemsXpagina
		});
	});

} //getviajesAdmin


//FUNCIÓN PARA OBTENER UN VIAJE EN CONCRETO
function getViaje(req, res) {
	var viaje_id = req.params.id;

	Viaje.findById(viaje_id).populate({
		path: 'userId'
	}).exec((err, viaje) => {
		if (err) {
			res.status(500).send({
				message: 'Error en la petición.'
			});
		} else if (!noticia) {
			res.status(404).send({
				message: 'El viaje no existe.'
			});
		} else {
			res.status(200).send({
				viaje: viaje
			});
		}
	});
} //getViaje



//FUNCIÓN PARA DAR DE ALTA NUEVOS VIAJES
function crearViaje(req, res) {
	//HACEMOS UNA INSTANCIA DEL MODELO
	var viaje = new Viaje();

	//RECOGEMOS LOS PARAMETROS DE LA PETICIÓN
	var params = req.body;
	

	if (params.origen && params.destino) {
		//ASIGNAMOS VALORES AL OBJETO
		viaje.origen = params.origen;
		viaje.destino = params.destino;
		viaje.horaSalida = params.horaSalida;
		viaje.status = params.status;
		viaje.choferId = req.user.sub;
		viaje.direccionO = params.direccionO;

			viaje.save((err, viajeStored) => {
				if (err) {
					
					res.status(500).send({
						message: 'Error al guardar el viaje.'
					});
				} else if (!viajeStored) {
					
					res.status(404).send({
						message: 'No se ha registrado el viaje.'
					});
				} else {
					
					res.status(200).send({
						viaje: viajeStored,
						message: 'exito al guardar viaje'
					});
				}
			});
	} else {
		res.status(200).send({
			message: 'Introduce todos los datos para el viaje.'
		});
	}
} //crearViaje

//FUNCIÓN PARA DAR DE ALTA NUEVOS VIAJES
function crearDireccion(req, res) {
	//HACEMOS UNA INSTANCIA DEL MODELO
	var direccion = new Direccion();
	//RECOGEMOS LOS PARAMETROS DE LA PETICIÓN
	var params = req.body;
	

	if (params.calle && params.numero) {
		//ASIGNAMOS VALORES AL OBJETO
		direccion.calle = params.calle;
		direccion.numero = params.numero;
		direccion.colonia = params.colonia;

			direccion.save((err, direccionStored) => {
				if (err) {
					
					res.status(500).send({
						message: 'Error al guardar el viaje.'
					});
				} else if (!direccionStored) {
					
					res.status(404).send({
						message: 'No se ha registrado el viaje.'
					});
				} else {
					
					res.status(200).send({
						direccion: direccionStored,
						message: 'Se registro la direccion con exito.'
					});
				}
			});
	} else {
		res.status(200).send({
			message: 'Introduce todos los datos para la direccion.'
		});
	}
} //crearDireccion

//FUNCIÓN PARA BORRAR VIAJES
function deleteViaje(req, res) {
	var viajeId = req.params.id;

	Viaje.findByIdAndRemove(viajeId, (err, viajeRemoved) => {
		if (err) {
			return res.status(500).send({
				message: 'Error en la peticion'
			});
		} else if (!viajeRemoved) {
			return res.status(404).send({
				message: 'No se ha podido eliminar el viaje'
			});
		} else {
			return res.status(200).send({
				viaje: viajeRemoved
			});
		}
	});
} //deleteViaje


//update noticia
function updateViaje(req, res) {
	var viajeId = req.params.id;
	var update = req.body;

	Viaje.findByIdAndUpdate(viajeId, update, {
		new: true
	}, (err, viajeUpdated) => {
		if (err) {
			res.status(500).send({
				message: 'Error en la petición'
			});
		} else if (!viajeUpdated) {
			res.status(404).send({
				message: 'No se ha actualizado el viaje'
			});
		} else {
			res.status(200).send({
				viaje: viajeUpdated,
				message: "actualizacion satisfactoria"
			});
		}
	});

} //updateViaje



module.exports = {
	pruebas,
	getViajes,
	getViajesAdmin,
	getViaje,
	getViajesUsers,
	updateViaje,
	deleteViaje,
	crearViaje,
	crearDireccion
}
