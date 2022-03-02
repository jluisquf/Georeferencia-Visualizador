const mongoose = require('mongoose');
const { Schema } = mongoose;

const EsquemaEstaciones = new Schema({}, { collection: 'estaciones' /*strict:false*/ });
module.exports = mongoose.model('Estaciones', EsquemaEstaciones);