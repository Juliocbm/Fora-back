'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DireccionSchema = Schema({
	calle:String,
	numero:Number,
	colonia:String
}); 

module.exports = mongoose.model('Direccion',DireccionSchema);