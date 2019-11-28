'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RideSchema = Schema({
    
    origen:String,
    destino:String,
    horaSalida:Date,
    status:Boolean,
    userId:{type:Schema.ObjectId, ref:'Usuario'}
    /* asociados:{
        choferId:{type:Schema.ObjectId, ref:'Usuario'},
        pasajero:Array
    },
    origen:
    {   ciudad:String,
        direccion:String
    },
    destino:
    {   ciudad:String,
        direccion:String
    },
	status:Boolean */
}); 

module.exports = mongoose.model('Viaje',RideSchema);