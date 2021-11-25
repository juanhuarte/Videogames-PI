const { Router } = require("express");
//const { listAllVideogames, list } = require("../functionHelpers/functions");
const videogames = require("./videogames");
const genres = require("./genres");
const videogame = require("./videogame");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
/*router.use("/", async () => {
  let dog = await listAllVideogames();
  console.log(dog);
});
*/
/*router.use("/videogames", () => {
  let dog = list();
  console.log(dog);
});
*/

router.use("/videogames", videogames); // sincronizo el archivo videogames con las rutas
router.use("/genres", genres); // sincronizo el archivo genres con las rutas
router.use("/videogame", videogame);

module.exports = router;
