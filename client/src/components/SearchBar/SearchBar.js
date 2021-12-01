import { useState } from "react";
import { useDispatch } from "react-redux";
import React from "react";
import { getAllVideogamesByName, cleanFilter } from "../../redux/actions/index";

export default function SearchBar({ setCurrentPage, setFilterGenre }) {
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
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="name"
          type="text"
          onChange={handleChange}
          value={input.name}
        />
        <button type="submit">Buscar</button>
      </form>
      <button onClick={handleClick}>Limpiar Filtro</button>
    </div>
  );
}
