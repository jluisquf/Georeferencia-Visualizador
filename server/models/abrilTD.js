const mongoose = require('mongoose');
const { Schema } = mongoose;

const EsquemaTraficoDenso = new Schema({}, { collection: 'abrilTest'});
module.exports = mongoose.model('prueba', EsquemaTraficoDenso);