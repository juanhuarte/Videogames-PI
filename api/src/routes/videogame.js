const { Router } = require("express");
const {
  findVideogameById,
  createVideogames,
} = require("../functionHelpers/functions");

const router = Router();

router.get("/:idVideogame", async (req, res) => {
  const { idVideogame } = req.params;
  const getGameById = await findVideogameById(idVideogame);
  getGameById
    ? res.status(200).send(getGameById)
    : res
        .status(404)
        .send({ error: "El id indicado no coincide con ningun videogame" });
});

router.post("/", async (req, res) => {
  const {
    name,
    description,
    realiseDate,
    rating,
    platforms,
    background_img,
    genres,
  } = req.body;
  let result = await createVideogames(
    name,
    description,
    realiseDate,
    rating,
    platforms,
    background_img,
    genres
  );
  result === "error"
    ? res.status(404).send({
        error:
          "no se pudo crear el videojuego porque no se completo todo el formulario",
      })
    : res.status(200).send({ msj: "se creo el videojuego" });
});

module.exports = router;
