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
import FilterAndSort from "../FilterAndSort/FilterAndSort";
import styles from "./Home.module.css";
import oldGame from "../../Images/oldGame.jpg";

export default function Home() {
  const videogames = useSelector((state) => state.videogamesCopy);
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(15);
  const [order, setOrder] = useState("");
  // ESTE FUNCA
  //const [filterGenre, setFilterGenre] = useState("");
  const [filterGenre, setFilterGenre] = useState([]);

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
  // ESTE FUNCA
  /*const handleFilterGenres = (e) => {
    e.preventDefault();
    dispatch(filterByGenre(e.target.value));
    setCurrentPage(1);
    setFilterGenre(e.target.value);
  };*/

  const handleFilterGenres = (e) => {
    e.preventDefault();
    dispatch(filterByGenre(e.target.value));
    setCurrentPage(1);
    setFilterGenre([...filterGenre, e.target.value]);
  };

  return videogames.length ? (
    <div className={styles.home}>
      {/* <div className={styles.bkg} /> */}

      <NavBar setCurrentPage={setCurrentPage} setFilterGenre={setFilterGenre} />
      <FilterAndSort
        sort={handleSort}
        genres={genres}
        handleFilterGenres={handleFilterGenres}
        filterGenre={filterGenre}
      />
      <Videogames videoGames={currentVideogame} />
      <Pagination
        videogamesLength={videogames.length}
        changeGames={changeGames}
        currentPage={currentPage}
        gamesPerPage={gamesPerPage}
      />
    </div>
  ) : filterGenre.length ? (
    <h1>No existen juego con esos filtros</h1>
  ) : (
    <h1>Loading</h1>
  );
}
