import {
  GET_ALL_VIDEOGAMES,
  GET_ALL_VIDEOGAMES_BY_NAME,
  CLEAN_FILTER,
} from "../actions/index";
const initialState = {
  videogames: [],
  videogamesCopy: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_VIDEOGAMES:
      return {
        ...state,
        videogames: [...action.payload],
        videogamesCopy: [...action.payload],
      };
    case GET_ALL_VIDEOGAMES_BY_NAME:
      return {
        ...state,
        videogamesCopy: [...action.payload],
      };
    case CLEAN_FILTER:
      return {
        ...state,
        videogamesCopy: [...state.videogames],
      };
    default:
      return state;
  }
}

/*const filterPage = (array, payload) => {
  return array.slice(15 * (payload - 1), 15 + 15 * (payload - 1));
};*/

export default rootReducer;
