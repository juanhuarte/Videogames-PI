import {
  GET_ALL_VIDEOGAMES,
  GET_ALL_VIDEOGAMES_BY_NAME,
  CLEAN_FILTER,
  ORDER_VIDEOGAMES,
  GET_ALL_GENDERS,
  FILTER_BY_GENRE,
  GET_VIDEOGAME_DETAILS,
  CREATE_VIDEOGAME,
  FIND_CREATED_GAMES_BY_NAME,
} from "../actions/index";
import { orderBy, filterGenre, findCreatedGame } from "./helper";
const initialState = {
  videogames: [],
  videogamesCopy: [],
  genres: [],
  videogameDetails: {},
  boolean: false,
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
    case ORDER_VIDEOGAMES:
      return {
        ...state,
        videogamesCopy: orderBy(state.videogamesCopy, action.payload),
      };
    case GET_ALL_GENDERS:
      return {
        ...state,
        genres: [...action.payload],
      };
    case FILTER_BY_GENRE:
      return {
        ...state,
        videogamesCopy: filterGenre(
          state.videogamesCopy,
          action.payload,
          state.videogames
        ),
      };
    case GET_VIDEOGAME_DETAILS:
      return {
        ...state,
        videogameDetails: action.payload,
      };
    case CREATE_VIDEOGAME:
      return { ...state };
    case FIND_CREATED_GAMES_BY_NAME:
      return {
        ...state,
        boolean: findCreatedGame(state.videogamesCopy, action.payload),
      };
    default:
      return state;
  }
}

export default rootReducer;
