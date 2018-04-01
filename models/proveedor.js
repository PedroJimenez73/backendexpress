var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var ProveedorSchema = new mongoose.Schema({
  nombre: { type : String, unique: true },
  cif: { type : String , unique : true },
  domicilio: String,
  cp: Number,
  localidad: String,
  provincia: String,
  telefono: Number,
  email: String
});

ProveedorSchema.plugin(uniqueValidator, { message: 'El {PATH} ya está en uso' });

module.exports = mongoose.model('Proveedor', ProveedorSchema);
