var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Llamar dependencias
var dotenv = require('dotenv').config();
var mongoose = require('mongoose');

//Obtener cadena de conexión de MongoDB
const mongoString = process.env.DATABASE_URL;
//Conectar a la base de datos
mongoose.set("strictQuery", false);
mongoose.connect(mongoString);
const database = mongoose.connection;

//lanzar un mensaje de éxito o de error dependiendo de si nuestra conexión a la base de datos es exitosa o fallida
database.on('error', (error) => {console.log(error)})
database.once('connected', () => {console.log("Base de datos conectada")});

var indexRouter = require('./routes/index');

var app = express();
const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173','https://contactos-i6vt.onrender.com']
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


module.exports = app;
