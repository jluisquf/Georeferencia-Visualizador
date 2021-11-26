const mongoose = require('mongoose');
const { Schema } = mongoose;

const EsquemaClima = new Schema({}, { collection: 'clima' /*strict:false*/ });
module.exports = mongoose.model('Clima', EsquemaClima);