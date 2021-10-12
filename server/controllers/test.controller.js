const traficodenso = require('../models/abrilTD');
const IncidenciasCtrl = {};
IncidenciasCtrl.diaTrafico = async(req, res) => {

    // let data = {
    //   'tiempo ': new RegExp('^2019-04-12')
    // /}
    const trafico = await traficodenso.find( {'tiempo ': new RegExp('2019-04-23')} ).sort({ 'tiempo ': 1 });
    res.json(trafico);
}
module.exports = IncidenciasCtrl;


