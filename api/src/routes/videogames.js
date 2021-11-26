//const express = require("express");
const { Router } = require("express");
const {
  listAllVideogames,
  getSomeGames,
  findVideogameById,
  createVideogames,
} = require("../functionHelpers/functions");

const { limitLengthArray } = require("../functionHelpers/functionsHelpers");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;

  if (name) {
    const getGames = await getSomeGames(name);
    if (!getGames)
      return res.status(404).send({
        error: "No existe ningun videojuego que contenga ese nombre",
      });
    let first15Games = limitLengthArray(getGames);
    getGames
      ? res.status(200).send(first15Games)
      : res.status(404).send({
          error: "No se puede visualizar los primeros 15 videojuegos",
        });
  } else {
    const games = await listAllVideogames();
    games
      ? res.status(200).send(games)
      : res
          .status(404)
          .send({ error: "No se puede visualizar los videojuegos" });
  }
});
/*

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
    gender,
  } = req.body;
  let result = await createVideogames(
    name,
    description,
    realiseDate,
    rating,
    platforms,
    background_img,
    gender
  );
  result === "error"
    ? res
        .status(404)
        .send({
          error:
            "no se pudo crear el videojuego porque no se completo todo el formulario",
        })
    : res.status(200).send({ msj: "se creo el videojuego" });
});
*/
module.exports = router;
