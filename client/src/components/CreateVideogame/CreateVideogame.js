import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import {
  createVideogame,
  getAllVideogames,
  getAllGenders,
} from "../../redux/actions/index";
import List from "../List/List";

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
  let readyToDispatch = false;
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
  };

  const onSubmit = (event) => {
    event.preventDefault();
    let validation = 0;
    for (let atribute of Object.keys(input)) {
      if (input[atribute].length === 0) validation++;
    }
    if (validation === 0) readyToDispatch = true;
    if (readyToDispatch === true) {
      dispatch(createVideogame(input));
      //dispatch(getAllVideogames());
      //dispatch(getAllGenders());
      setInput({ ...input, redirect: true });
      setInputFullfilled(true);
      readyToDispatch = false;
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
        <label>Realise Date: </label>
        <input
          name="realiseDate"
          type="date"
          onChange={handleChange}
          value={input.realiseDate}
        />
        <label>Rating: </label>
        <input
          name="rating"
          type="text"
          onChange={handleChange}
          value={input.rating}
        />
        <label>Description: </label>
        <textarea
          type="description"
          name="description"
          onChange={handleChange}
          value={input.description}
        />
        <label>Background Image: </label>
        <input
          name="background_img"
          type="text"
          onChange={handleChange}
          value={input.background_img}
        />
        <div>
          <List
            itemToSelect="genres"
            itemsList={genres}
            selectHandler={handleChange}
          />
          {genres?.map((genre, i) =>
            input.genres.includes(genre.id) ? (
              <li key={i}>
                {genre.name}
                <button onClick={() => handleDelete(genre.id)}>X</button>
              </li>
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
            <li key={i}>
              {platform}
              <button onClick={() => handleDeletePlatforms(platform)}>X</button>
            </li>
          ))}
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
