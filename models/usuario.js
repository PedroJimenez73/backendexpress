var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var rolesValidos = {
    values: ['admin', 'key-user', 'user'],
    message: '{VALUE} no es un rol permitido' 
};


var usuarioSchema = new Schema({

    nombre: { type: String },
    // nombre: { type: String, required: [true, 'El nombre es necesario'] },
    email: { type: String, unique: true },
    //password: { type: String, required: [true, 'La contraseña es necesaria'] },
    password: { type: String },
    role: { type: String }
    //role: { type: String, required: true, default: 'user', enum: rolesValidos }

});

usuarioSchema.plugin(uniqueValidator, { message: 'El {PATH} ya está en uso, introduzca otro por favor.' });

module.exports = mongoose.model('Usuario', usuarioSchema);