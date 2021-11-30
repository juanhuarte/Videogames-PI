//const express = require("express");
const { Router } = require("express");
const {
  listAllVideogames,
  getSomeGames,
  findVideogameById,
  createVideogames,
} = require("../functionHelpers/functions");

const { Videogame } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;

  if (name) {
    const getGames = await getSomeGames(name);
    getGames
      ? res.status(200).send(getGames)
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

module.exports = router;
