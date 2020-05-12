const {config} = require('../config');

function cacheReponse ( res, seconds) {
    if(!config.dev){
        res.set('Cache-Control', `public, max-age=${seconds}`)
    }
}
// Solo colocar cache a paginas que necesitan datos constantes del servidor.
module.exports = cacheReponse;