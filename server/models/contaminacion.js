const mongoose = require('mongoose');
const { Schema } = mongoose;

const EsquemaContaminacion = new Schema({}, { collection: 'contaminacion2020' /*strict:false*/ });
module.exports = mongoose.model('Contaminacion', EsquemaContaminacion);