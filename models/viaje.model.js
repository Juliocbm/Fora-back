'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RideSchema = Schema({
    
    origen:String,
    destino:String,
    horaSalida:Date,
    status:Boolean,
    choferId:{type:Schema.ObjectId, ref:'Usuario'},
    origenId:{type:Schema.ObjectId, ref:'Direccion'}
  
}); 

module.exports = mongoose.model('Viaje',RideSchema);