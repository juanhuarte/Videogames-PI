import { Route, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllVideogames,
  orderVideogames,
  getAllGenders,
  filterByGenre,
} from "../../redux/actions/index";
import React from "react";
import Videogames from "../Videogames/Videogames";
import Pagination from "../Pagination/Pagination";
import NavBar from "../NavBar/NavBar";

export default function Home() {
  const videogames = useSelector((state) => state.videogamesCopy);
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(15);
  const [order, setOrder] = useState("");
  const [filterGenre, setFilterGenre] = useState("");

  let lastGame = currentPage * gamesPerPage;
  let firstGame = lastGame - gamesPerPage;
  const currentVideogame = videogames.slice(firstGame, lastGame);

  const changeGames = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  React.useEffect(() => {
    dispatch(getAllVideogames());
    dispatch(getAllGenders());
  }, []);

  const handleSort = (event) => {
    event.preventDefault();
    dispatch(orderVideogames(event.target.value));
    setCurrentPage(1);
    setOrder(event.target.value);
  };

  const handleFilterGenres = (e) => {
    e.preventDefault();
    dispatch(filterByGenre(e.target.value));
    setCurrentPage(1);
    setFilterGenre(e.target.value);
  };

  return (
    <div>
      <NavLink to="/">
        <button>Landing</button>
      </NavLink>
      <h1>Listado de Videogames</h1>
      <NavBar
        setCurrentPage={setCurrentPage}
        sort={handleSort}
        genres={genres}
        handleFilterGenres={handleFilterGenres}
      />
      <Pagination
        videogamesLength={videogames.length}
        changeGames={changeGames}
        currentPage={currentPage}
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
