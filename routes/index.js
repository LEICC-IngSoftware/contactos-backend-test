var express = require('express');
var router = express.Router();

const Contacto = require('../modelos/contacto')

//Crear contacto en la base de datos
router.post('/contacto', async function(req, res, next) {
  const datos = new Contacto({
    nombre: req.body.nombre, 
    email: req.body.email, 
    telefono: req.body.telefono
  });
  try {
    const nuevo = await datos.save();
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({message: error.message})
  }
});

//Listar contactos de la base de datos
router.get('/contacto', async function(req, res, next) {
  try {
    const contactos = await Contacto.find();
    res.status(200).json(contactos);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
});

//Obtener un contacto
router.get('/contacto/:id', async function(req, res, next) {
  try {
    const id = req.params.id;
    const contacto = await Contacto.findById(id);
    res.status(200).json(contacto);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
});

//Actualizar contacto de la base de datos
router.patch('/contacto/:id', async function(req, res, next) {
  try {
    const id = req.params.id;
    const actualizarDatos = req.body;
    const opciones = { new: true };
    const contacto = await Contacto.findByIdAndUpdate(id, actualizarDatos, opciones);
    res.status(200).json(contacto);
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
});

//Eliminar contacto de la base de datos
router.delete('/contacto/:id', async function(req, res, next) {
  try {
    const id = req.params.id;
    const contacto = await Contacto.findByIdAndDelete(id);
    res.status(204).json(contacto);
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
});

module.exports = router;
