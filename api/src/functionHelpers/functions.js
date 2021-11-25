const axios = require("axios");
const { mapping, limitLengthArray } = require("./functionsHelpers");
const { Gender, Videogame } = require("../db.js");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const { API_KEY } = process.env;

async function listAllVideogames() {
  //console.log("1", API_KEY);
  try {
    let allPromise = [];
    for (var i = 1; i < 6; i++) {
      allPromise.push(
        axios.get(`https://api.rawg.io/api/games?page=${i}&key=${API_KEY}`)
      );
    }
    return await Promise.all(allPromise).then((resolve) => {
      //console.log(resolve);
      // flat quita un nivel del array
      return resolve.map((dato) => mapping(dato.data.results)).flat(); // en resolve voy a tener las respuestas del llamado a la api( van a ser 5) y luego tengo que hacer un map para sacar la data de cada respuesta de la api y por ultimo otro map para traer la data que me importa del juego
    });
  } catch (error) {
    console.error(error);
  }
}

const getSomeGames = (gameName) => {
  let someGames = [];
  try {
    someGames = axios
      .get(`https://api.rawg.io/api/games?search=${gameName}&key=${API_KEY}`)
      .then((dato) => {
        return dato.data.results;
      });
    return someGames;
  } catch (error) {
    console.log(error);
  }
};

const findVideogameById = async (id) => {
  try {
    const apiCall = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
    let videogame = apiCall.data;
    return (videogame = {
      id: videogame.id,
      name: videogame.name,
      realiseDate: videogame.released,
      rating: videogame.rating,
      description: videogame.description,
      gender: videogame.genres.map((g) => g.name),
      platforms: videogame.parent_platforms.map((p) => p.platform.name),
      background_img: videogame.background_image,
    });
  } catch (error) {
    console.log(error);
  }
};

async function getGenres() {
  const apiCall = await axios.get(
    `https://api.rawg.io/api/genres?key=${API_KEY}`
  );
  let genders = apiCall.data.results.map((element) => {
    return {
      name: element.name,
    };
  });
  Gender.bulkCreate(genders);
}

const createVideogames = async (
  name,
  description,
  realiseDate,
  rating,
  platforms,
  background_img,
  gender
) => {
  console.log(name, description);
  if (
    name &&
    description &&
    realiseDate &&
    rating &&
    platforms &&
    background_img
  ) {
    try {
      let [videogame, created] = await Videogame.findOrCreate({
        where: { name },
        defaults: {
          id: uuidv4(),
          description,
          realiseDate,
          rating,
          platforms,
          background_img,
        },
      });
      if (created) await videogame.addGender(gender);
      else return "error";
    } catch (error) {
      console.log(error);
    }
  } else {
    return "error";
  }
};

/*
const list = () => {
  console.log("1", API_KEY);
  let allVideogames = [];
  try {
    fetch(`https://api.rawg.io/api/games?key=${API_KEY}`)
      .then((resolve) => resolve.json())
      .then((data) => {
        allVideogames = [...data.results];
      });
    return allVideogames;
  } catch (error) {
    console.error(error);
  }
};
*/

/*
  const api = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
  //const api = await axios.get(
  //  "https://api.rawg.io/api/games?key=b657ab292d234da18bd8fa41abd98110"
  //);
  const dataPage1 = api.data; // axios nos devuleve un objeto con mas objetos en donde tiene una propiedad llamada data que contiene toda la info de los videogames
  allVideogames = [...allVideogames, ...dataPage1.results]; // como la api tiene toda la info que necesito en result, lo guardo en el arreglo previamente copiando lo que tenia antes el arreglo. en este caso esta vacio
*/

/*
    let api = []
    for(var i= 0; i<5; i++){
      api.push(await axios.get(
        `https://api.rawg.io/api/games?page=${i}&key=${API_KEY}`
      ));
    }
    Promise.all(api).then((resolve) => {

    })

    */

/*
    let videogame = await Videogame.create({
      id: uuidv4(),
      name,
      description,
      realiseDate,
      rating,
      platforms,
      background_img,
    });
    await videogame.addGender(gender);
    */

/*
    let count = 1;
    // PROBAR HACERLO CON PROMISE ALL PARA QUE SE EJECUTE TODO EN PARALELO
    while (count < 6) {
      const api = await axios.get(
        `https://api.rawg.io/api/games?page=${count}&key=${API_KEY}`
      );
      const eachPage = api.data;
      allVideogames = [...allVideogames, ...eachPage.results];
      count++;
    }*/

module.exports = {
  listAllVideogames,
  getSomeGames,
  limitLengthArray,
  findVideogameById,
  getGenres,
  createVideogames,
};
