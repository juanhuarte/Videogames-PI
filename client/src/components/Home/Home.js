import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderVideogames, filterByGenre } from "../../redux/actions/index";
import React from "react";
import Videogames from "../Videogames/Videogames";
import Pagination from "../Pagination/Pagination";
import NavBar from "../NavBar/NavBar";
import FilterAndSort from "../FilterAndSort/FilterAndSort";
import styles from "./Home.module.css";
import notFound from "../../Images/notFound.jpg";
import Loading from "../Loading/Loading";

export default function Home() {
  const videogames = useSelector((state) => state.videogamesCopy);
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(15);
  const [order, setOrder] = useState("");
  const [filterGenre, setFilterGenre] = useState([]);
  const [clicked, setClicked] = useState({ sort: true, filter: true });

  const notFoundVg = [
    {
      id: "a124568",
      name: "VIDEOGAME NOT FOUNDED",
      background_img: notFound,
      gender: ["Try another"],
    },
  ];

  let lastGame = currentPage * gamesPerPage;
  let firstGame = lastGame - gamesPerPage;
  let currentVideogame = videogames.slice(firstGame, lastGame);

  const changeGames = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (event) => {
    event.preventDefault();
    dispatch(orderVideogames(event.target.value));
    setCurrentPage(1);
    setOrder(event.target.value);
    setClicked({ ...clicked, sort: false });
  };

  const handleFilterGenres = (e) => {
    e.preventDefault();
    dispatch(filterByGenre(e.target.value));
    setCurrentPage(1);
    if (e.target.value === "All Genres") setFilterGenre([e.target.value]);
    else if (e.target.value === "API Games") setFilterGenre([e.target.value]);
    else if (e.target.value === "Created Videogames")
      setFilterGenre([e.target.value]);
    else setFilterGenre([...filterGenre, e.target.value]);
    setClicked({ ...clicked, filter: false });
  };

  return videogames.length || (!videogames.length && filterGenre.length) ? (
    <div className={styles.home}>
      {/* <div className={styles.bkg} /> */}
      <NavBar
        setCurrentPage={setCurrentPage}
        setFilterGenre={setFilterGenre}
        setClicked={setClicked}
      />
      <FilterAndSort
        sort={handleSort}
        genres={genres}
        handleFilterGenres={handleFilterGenres}
        filterGenre={filterGenre}
        clicked={clicked}
      />
      <Videogames
        videoGames={videogames.length ? currentVideogame : notFoundVg}
      />
      <Pagination
        videogamesLength={videogames.length}
        changeGames={changeGames}
        currentPage={currentPage}
        gamesPerPage={gamesPerPage}
      />
    </div>
  ) : (
    <Loading />
  );
}
