const mongoose = require('mongoose');
const { Schema } = mongoose;

const EsquemaTraficoDenso = new Schema({}, { collection: 'abrilCompleto'});
module.exports = mongoose.model('prueba', EsquemaTraficoDenso);