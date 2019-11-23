'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_de_Sagarpa_app_tec';

exports.ensureAuth = function(req,res,next){
	if(!req.headers.authorization){
		return res.status(403).send({
			message:'La petición no tiene la cabecera de autenticación'
		});
	}else{
		var token = req.headers.authorization.replace(/['"]+/g,'');
		try{
			var payload = jwt.decode(token, secret);
			if(payload.exp <= moment().unix()){
				return res.status(404).send({
					message:'El token ha expirado'
				});
			}
		}catch(ex){
			return res.status(404).send({
				message:'El token no es válido'
			});
		}//catch
	}
	req.user = payload;

	//Para pasar al método de la acción
	next();

}//ensureAuth
