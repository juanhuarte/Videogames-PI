import { Route, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideogames } from "../../redux/actions/index";
import React from "react";
import Videogames from "../Videogames/Videogames";
import { pageRender } from "./functionHelper";
import SearchBar from "../SearchBar/SearchBar";
import Pagination from "../Pagination/Pagination";

export default function Home() {
  const videogames = useSelector((state) => state.videogamesCopy);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(15);

  let lastGame = page * gamesPerPage;
  let firstGame = lastGame - gamesPerPage;
  const currentVideogame = videogames.slice(firstGame, lastGame);

  const changeGames = (pageNumber) => {
    setPage(pageNumber);
  };

  React.useEffect(() => {
    dispatch(getAllVideogames());
  }, []);

  return (
    <div>
      <NavLink to="/">
        <button>Landing</button>
      </NavLink>
      <h1>Listado de Videogames</h1>
      <SearchBar setPage={setPage} />
      <Pagination
        videogamesLength={videogames.length}
        changeGames={changeGames}
        page={page}
        gamesPerPage={gamesPerPage}
      />
      {/*<button onClick={() => (page === 1 ? page : setPage(page - 1))}>
        Anterior
      </button>
      <button
        onClick={() =>
          page === Math.ceil(videogames.length / 15) ? page : setPage(page + 1)
        }
      >
        Siguiente
      </button>

      <Videogames videoGames={pageRender(videogames, page)} /> */}
      <Videogames videoGames={currentVideogame} />
    </div>
  );
}
