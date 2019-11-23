'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
	
	name:String,
	municipio:String,
	localidad:String,
	sector:String,
	surname:String,
	email:String,
	password:String,
	role:String,
	status:Boolean,
	image:String
}); 

//module.exports = mongoose.model('User',UserSchema);
module.exports = mongoose.model('Usuario',UserSchema);