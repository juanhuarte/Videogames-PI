import axios from "axios";
export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_ALL_VIDEOGAMES_BY_NAME = "GET_ALL_VIDEOGAMES_BY_NAME";
export const CLEAN_FILTER = "CLEAN_FILTER";
export const ORDER_VIDEOGAMES = "ORDER_VIDEOGAMES";
export const GET_ALL_GENDERS = "GET_ALL_GENDERS";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";

export function getAllVideogames() {
  return function (dispatch) {
    return fetch("http://localhost:3001/videogames")
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_ALL_VIDEOGAMES, payload: json });
      });
  };
}

export function getAllVideogamesByName(name) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/videogames?name=${name}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_ALL_VIDEOGAMES_BY_NAME, payload: json });
      });
  };
}

export function cleanFilter() {
  return function (dispatch) {
    dispatch({
      type: CLEAN_FILTER,
    });
  };
}

export const orderVideogames = (payload) => (dispatch) =>
  dispatch({
    type: ORDER_VIDEOGAMES,
    payload: payload,
  });

export function getAllGenders() {
  return async function (dispatch) {
    try {
      const genres = await axios.get("http://localhost:3001/genres");
      dispatch({
        type: GET_ALL_GENDERS,
        payload: genres.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const filterByGenre = (genre) => (dispatch) =>
  dispatch({
    type: FILTER_BY_GENRE,
    payload: genre,
  });

//export const filterByGenre = (genre) => console.log("actionn", genre);
