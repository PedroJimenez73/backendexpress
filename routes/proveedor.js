var express = require('express');
//var router = express.Router();
var mongoose = require('mongoose');
var Proveedor = require('../models/proveedor.js');

var app = express();


var mdAutenticacion = require('../middlewares/autenticacion');

/* Get a todos los proveedores */
app.get('/', function(req, res, next) {

  var desde = req.query.desde || 0;
  desde = Number(desde);

  Proveedor.find({})
      .skip(desde)
      .limit(5)
      .exec((error, proveedores) => {

          if (error) {
              return res.status(500).json({
                  ok: false,
                  mensaje: 'Error en acceso a la Base de Datos',
                  errores: error
              });
          }

          Proveedor.count({}, (error, totales)=>{
            res.status(200).json({
              ok: true,
              proveedores: proveedores,
              totales: totales
            });
          })
          
          // res.status(200).json({
          //   ok: true,
          //   proveedores: proveedores,
          //   total
          // });
      });
});

// /* Get proveedor por id */
app.get('/:id', function(req, res, next) {

  var id = req.params.id;
  var body = req.body;

  Proveedor.findById(id, (error, proveedor) => {

      if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error en acceso a la Base de Datos',
                errores: error
            });
        }

        res.status(200).json({
            ok: true,
            proveedor: proveedor
        });


    });
});

// /* Get proveedor por nombre */

app.get('/busqueda/:busqueda', function(req,res,next){
  Proveedor.find({"nombre":{$regex: req.params.busqueda, $options: 'i'}}, function(err, proveedores){
    if (err) return next(err);
    res.json(proveedores);
  })
});

// /* Get proveedor por localidad */

app.get('/localidad/:localidad', function(req,res,next){
  Proveedor.find({"nombre":{$regex: req.params.localidad, $options: 'i'}}, function(err, proveedores){
    if (err) return next(err);
    res.json(proveedores);
  })
});

// /* Get proveedor por nombre y localidad */
app.get('/mixto/:nombre/:localidad', function(req,res,next){
  var nombre = req.params.nombre;
  var localidad = req.params.localidad;
  Proveedor.find({$or: [{"nombre":{$regex: nombre, $options: 'i'}},{"localidad":{$regex: localidad, $options: 'i'}}]}, function(err, proveedores){
    if (err) return next(err);
    res.json(proveedores);
  })
});

/* Post proveedor */
// app.post('/', mdAutenticacion.verificaToken , function(req, res, next) {
//   Proveedor.create(req.body, function (err, post) {
//     //if (err) return next(err);
//     if (err) {
//       return res.status(400).json({
//           ok: false,
//           mensaje: 'Error al crear proveedor',
//           errors: err
//       });
//     }
//     res.json(post);
//   });
// });

app.post('/', (req, res) => {

  var body = req.body;

  var proveedor = new Proveedor({
    nombre: body.nombre,
    cif: body.cif,
    domicilio: body.domicilio,
    cp: body.cp,
    localidad: body.localidad,
    provincia: body.provincia,
    telefono: body.telefono,
    email: body.email 
  });

  proveedor.save((err, proveedorGuardado) => {

      if (err) {
          return res.status(400).json({
              ok: false,
              mensaje: 'Error al crear proveedor',
              errores: err
          });
      }

      res.status(201).json({
          ok: true,
          proveedor: proveedorGuardado
      
        });


  });

});

/* Put Proveedor */
app.put('/:id', function(req, res, next) {
  Proveedor.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Delete proveedor */
app.delete('/:id', function(req, res, next) {
  Proveedor.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = app;