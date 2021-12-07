import { useState } from "react";
import { useDispatch } from "react-redux";
import React from "react";
import { getAllVideogamesByName, cleanFilter } from "../../redux/actions/index";
import { HiRefresh } from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";
import styles from "./SearchBar.module.css";

export default function SearchBar({
  setCurrentPage,
  setFilterGenre,
  setClicked,
}) {
  const dispatch = useDispatch();
  const [input, setInput] = useState({ name: "" });

  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  function onSubmit(event) {
    event.preventDefault();
    dispatch(getAllVideogamesByName(input.name));
    setCurrentPage(1);
  }

  function handleClick() {
    input.name = "";
    dispatch(cleanFilter());
    setFilterGenre([]);
    setCurrentPage(1);
    setClicked({ sort: true, filter: true });
  }

  return (
    <div className={styles.searchbar}>
      <div className={styles.form}>
        <form onSubmit={onSubmit}>
          <div className={styles.a}>
            <input
              className={styles.input}
              name="name"
              type="text"
              placeholder="Search Videogame"
              onChange={handleChange}
              value={input.name}
            />
            <button className={styles.submit} type="submit">
              <IoSearchOutline />
            </button>
          </div>
        </form>
      </div>
      <button className={styles.refresh} onClick={handleClick}>
        <HiRefresh />
      </button>
    </div>
  );
}
