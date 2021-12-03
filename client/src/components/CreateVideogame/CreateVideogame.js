import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import {
  createVideogame,
  getAllVideogames,
  getAllGenders,
} from "../../redux/actions/index";
import List from "../List/List";
import { NavLink } from "react-router-dom";
import styles from "./CreateVideogame.module.css";

export default function CreateVideogame() {
  const [input, setInput] = useState({
    name: "",
    realiseDate: "",
    rating: "",
    description: "",
    platforms: [],
    genres: [],
    background_img: "",
    redirect: false,
  });
  const [inputFullfilled, setInputFullfilled] = useState(false);
  const [readyToDispatch, setReadyToDispatch] = useState(false);
  const platforms = [
    { name: "PC" },
    { name: "PlayStation 1" },
    { name: "PlayStation 2" },
    { name: "PlayStation 3" },
    { name: "PlayStation 4" },
    { name: "PlayStation 5" },
    { name: "XBox 360" },
    { name: "XBox One" },
    { name: "XBox Series X" },
    { name: "Nintendo" },
    { name: "Wii" },
    { name: "Sega" },
  ];
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  // let readyToDispatch = false;
  const handleChange = (event) => {
    if (event.target.name === "genres") {
      setInput({
        ...input,
        genres: [...input.genres, parseInt(event.target.value)],
      });
      event.target.value = "";
    } else if (event.target.name === "platforms") {
      setInput({
        ...input,
        platforms: [...input.platforms, event.target.value],
      });
      event.target.value = "";
    } else setInput({ ...input, [event.target.name]: event.target.value });
    let validation = 0;
    for (let atribute of Object.keys(input)) {
      if (input[atribute].length === 0) validation++;
    }
    if (input.background_img.length >= 0) validation--;
    if (validation === 0) setReadyToDispatch(true);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // let validation = 0;
    // for (let atribute of Object.keys(input)) {
    //   if (input[atribute].length === 0) validation++;
    // }
    // if (validation === 0) readyToDispatch = true;
    if (readyToDispatch === true) {
      dispatch(createVideogame(input));
      dispatch(getAllVideogames()); // despacho esta accion para que se actualice el array donde tengo todos los juegos(los creados y los de la api)
      dispatch(getAllGenders());
      setInput({ ...input, redirect: true });
      setInputFullfilled(true);
      setReadyToDispatch(false);
      console.log("input", input);
    } else {
      alert("all fields must be completed");
    }
  };

  function handleDelete(id) {
    setInput({
      ...input,
      genres: input.genres?.filter((genre) => genre !== id),
    });
  }

  function handleDeletePlatforms(name) {
    setInput({
      ...input,
      platforms: input.platforms?.filter((platform) => platform !== name),
    });
  }
  return inputFullfilled === true ? (
    <Redirect to="/home" />
  ) : (
    <div>
      <form onSubmit={onSubmit}>
        <label>Name: </label>
        <input
          name="name"
          type="text"
          onChange={handleChange}
          value={input.name}
        />
        <p>Name is required</p>
        <label>Realise Date: </label>
        <input
          name="realiseDate"
          type="date"
          onChange={handleChange}
          value={input.realiseDate}
        />
        <p>Name is required</p>
        <label>Rating: </label>
        <input
          name="rating"
          type="text"
          onChange={handleChange}
          value={input.rating}
        />
        <p>Name is required</p>
        <label>Description: </label>
        <textarea
          className={styles.textarea}
          type="description"
          name="description"
          onChange={handleChange}
          value={input.description}
        />
        <p>Name is required</p>
        <label>Background Image: </label>
        <input
          name="background_img"
          type="text"
          onChange={handleChange}
          value={input.background_img}
        />
        <p>Name is required</p>
        <div>
          <List
            itemToSelect="genres"
            itemsList={genres}
            selectHandler={handleChange}
          />
          {genres?.map((genre, i) =>
            input.genres.includes(genre.id) ? (
              <div className={styles.list}>
                <li key={i}>
                  {genre.name}
                  <button onClick={() => handleDelete(genre.id)}>X</button>
                </li>
              </div>
            ) : null
          )}
        </div>
        <div>
          <List
            itemToSelect="platforms"
            itemsList={platforms}
            selectHandler={handleChange}
          />
          {input.platforms?.map((platform, i) => (
            <div className={styles.list}>
              <li key={i}>
                {platform}
                <button onClick={() => handleDeletePlatforms(platform)}>
                  X
                </button>
              </li>
            </div>
          ))}
        </div>

        <button
          className={styles.create}
          disabled={!readyToDispatch}
          type="submit"
        >
          Create
        </button>
      </form>
      <NavLink to="/home">
        <button>X</button>
      </NavLink>
    </div>
  );
}
