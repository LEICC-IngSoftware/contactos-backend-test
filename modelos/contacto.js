const mongoose = require('mongoose');
const { Schema } = mongoose;

const contacto = new Schema({
  nombre:  String, 
  email: String,
  telefono: Number
}, {collection: 'contactos'});

module.exports = mongoose.model('Data',contacto)