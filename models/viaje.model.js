'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RideSchema = Schema({
    
    horaSalida:Date,
    status:Boolean,
    choferId:{type:Schema.ObjectId, ref:'Usuario'},
    direccionO:{type:Schema.ObjectId, ref:'Direccion'},
    direccionD:{type:Schema.ObjectId, ref:'Direccion'}
}); 

module.exports = mongoose.model('Viaje',RideSchema);