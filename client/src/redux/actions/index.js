export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_ALL_VIDEOGAMES_BY_NAME = "GET_ALL_VIDEOGAMES_BY_NAME";
export const CLEAN_FILTER = "CLEAN_FILTER";

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
