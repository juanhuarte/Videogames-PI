const { Router } = require("express");
const { Gender } = require("../db.js");

const router = Router();

router.get("/", async (req, res) => {
  const getGenders = await Gender.findAll({ attributes: ["name", "id"] });
  let genders = getGenders.map((element) => {
    return element.dataValues;
  });
  genders.length
    ? res.status(200).send(genders)
    : res.status(404).send({ error: "No se pudo encontrar el genero" });
});

module.exports = router;
