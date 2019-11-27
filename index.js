'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3000;
var http = require('http').Server(app);


mongoose.Promise = global.Promise;
//Conexión a la base de datos

mongoose.connect('mongodb://localhost:27017/foraBD',{useNewUrlParser:true})
//mongoose.connect('mongodb://juliocbm500:YeVfhj555ybymmPc@cluster0-shard-00-00-e8zdp.mongodb.net:27017,cluster0-shard-00-01-e8zdp.mongodb.net:27017,cluster0-shard-00-02-e8zdp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',{useNewUrlParser:true})
	.then(() =>{	
		//Si se conecta exitosamente mostramos un mensaje de exito.
		console.log('La conexión a la base de datos foraBD se ha realizado correctamente...');
		http.listen(port, () => {
			console.log("El servidor local con Node y Express esta corriendo correctamente..."+port);
		});
	})
	//cachamos el error cuando exista...
	.catch(err => console.log(err));

