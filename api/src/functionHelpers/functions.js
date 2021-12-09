const axios = require("axios");
const { mapping, limitLengthArray } = require("./functionsHelpers");
const { Gender, Videogame } = require("../db.js");
require("dotenv").config();
const { API_KEY } = process.env;

async function listAllVideogames() {
  try {
    let allPromise = [];
    for (var i = 1; i < 6; i++) {
      allPromise.push(
        axios.get(`https://api.rawg.io/api/games?page=${i}&key=${API_KEY}`)
      );
    }
    let allGames = await Promise.all(allPromise).then((resolve) => {
      // flat quita un nivel del array
      return resolve.map((dato) => mapping(dato.data.results)).flat(); // en resolve voy a tener las respuestas del llamado a la api( van a ser 5) y luego tengo que hacer un map para sacar la data de cada respuesta de la api y por ultimo otro map para traer la data que me importa del juego
    });
    let dbGames = await getVideogameCreated();
    return [...dbGames, ...allGames];
  } catch (error) {
    console.error(error);
  }
}

const getSomeGames = async (gameName) => {
  let someGames = [];
  try {
    someGames = await axios
      .get(`https://api.rawg.io/api/games?search=${gameName}&key=${API_KEY}`)
      .then((dato) => {
        return dato.data.results;
      });
    if (someGames.length > 0) someGames = mapping(someGames);

    let createdGames = await getVideogameCreated();
    if (createdGames.length > 0) {
      createdGames = createdGames.filter((game) => game.name === gameName);
      let videogames = [...createdGames, ...someGames];
      videogames = limitLengthArray(videogames);
      return videogames;
    }
    if (someGames.length === 0)
      someGames = [
        {
          id: "a124568",
          name: "VIDEOGAME NOT FOUNDED",
          background_img:
            "https://images.unsplash.com/photo-1609743522653-52354461eb27?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
          gender: ["Try another"],
        },
      ];
    return limitLengthArray(someGames);
  } catch (error) {
    console.log(error);
  }
};

const findVideogameById = async (id) => {
  try {
    if (id.length < 10) {
      const apiCall = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
      let videogame = apiCall.data;
      return (videogame = {
        id: videogame.id,
        name: videogame.name,
        realiseDate: videogame.released,
        rating: videogame.rating,
        description: videogame.description_raw,
        gender: videogame.genres.map((g) => g.name),
        platforms: videogame.parent_platforms.map((p) => p.platform.name),
        background_img: videogame.background_image,
      });
    } else {
      let createdVgDetail = await getVideogameCreated();
      let videogame = createdVgDetail.find((game) => game.id === id);

      return videogame;
    }
  } catch (error) {
    console.log(error);
  }
};

async function getGenres() {
  try {
    const apiCall = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    let genders = apiCall.data.results.map((element) => {
      return {
        name: element.name,
      };
    });
    // tener cuidado con la promesa del findOrCreate
    genders.map((genre) => {
      Gender.findOrCreate({
        where: { name: genre.name },
      });
    });
  } catch (error) {
    console.log(error);
  }
}

const createVideogames = async (
  name,
  description,
  realiseDate,
  rating,
  platforms,
  background_img,
  genres
) => {
  try {
    let videogame = await Videogame.create({
      name,
      description,
      realiseDate,
      rating,
      platforms,
      background_img,
    });
    await videogame.addGender(genres);
  } catch (error) {
    console.log(error);
    return "error";
  }
};

const getVideogameCreated = async () => {
  const gamesCreated = await Videogame.findAll({
    include: [
      {
        model: Gender,
        as: "genders",
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
    ],
  })
    .then((r) => r)
    .then((videogame) =>
      videogame.map((element) => ({
        id: element.id,
        name: element.name,
        description: element.description,
        realiseDate: element.realiseDate,
        rating: element.rating,
        platforms: element.platforms.map((p) => p),
        background_img: element.background_img,
        gender: element.genders.map((e) => e.name),
      }))
    );
  return gamesCreated;
};

module.exports = {
  listAllVideogames,
  getSomeGames,
  limitLengthArray,
  findVideogameById,
  getGenres,
  createVideogames,
};
