'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DireccionSchema = Schema({
	calle:String,
	numero:Number,
	colonia:String/* ,
	referencia:String,
	pais:String,
	estado:String,
	municipio:String */
}); 

module.exports = mongoose.model('Direccion',DireccionSchema);