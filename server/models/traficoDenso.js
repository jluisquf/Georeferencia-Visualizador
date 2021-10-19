const mongoose = require('mongoose');
const { Schema } = mongoose;

const EsquemaTraficoDenso = new Schema({}, { collection: 'traficoDenso2019'});
module.exports = mongoose.model('prueba', EsquemaTraficoDenso);