//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { default: axios } = require("axios");
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { getGenres } = require("./src/functionHelpers/functions");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
    // aca tendria que hacer el precargado de los genres
    // puedo immportar el modelo (tabla gender), llamo a la api me traigo los 19 generos, los tengo que pushear en un array que voy a tener promesas e ir creando en la base de datos cargando los generos.

    //NO OLVIDARME DE DESCOMENTAR ESTO CUANDO FUNQUE LA API
    getGenres(); // hago el llamado a la api y me traigo los generos y cargo la tabla genders de db con la data que obtuve de la api
  });
});
