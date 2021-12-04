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
import { validationFunc } from "./validationFunc";

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
  const [inputFullfilled, setInputFullfilled] = useState({
    boolean: false,
    clicked: false,
  });
  const [readyToDispatch, setReadyToDispatch] = useState(false);
  const [errors, setErrors] = useState({});
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
    if (event.target.name === "Genres") {
      setInput({
        ...input,
        genres: [...input.genres, parseInt(event.target.value)],
      });
      event.target.value = "";
    } else if (event.target.name === "Platforms") {
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
    const errors = validationFunc(input);
    setErrors(errors);
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
      setInputFullfilled({ ...inputFullfilled, boolean: true });
      setReadyToDispatch(false);
      console.log("input", input);
    } else {
      // alert("all fields must be completed");
      setInputFullfilled({ ...inputFullfilled, clicked: true });
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
  return inputFullfilled.boolean === true ? (
    <Redirect to="/home" />
  ) : (
    <div className={styles.createvg}>
      <div className={styles.bkg} />
      <div className={styles.container}>
        <form onSubmit={onSubmit} className={styles.form}>
          {/* <label>Name: </label> */}
          <div className={styles.inputname}>
            <input
              className={
                inputFullfilled.clicked && errors.name
                  ? styles.notfulfilled
                  : styles.inputn
              }
              name="name"
              type="text"
              onChange={handleChange}
              value={input.name}
              placeholder="Name"
            />
            {inputFullfilled.clicked && errors.name && (
              <p className={styles.notfulfilledLabel}>Name is required</p>
            )}
          </div>
          <div className={styles.inputdate}>
            <label className={styles.label}>Realise Date: </label>
            <input
              className={
                inputFullfilled.clicked && errors.realiseDate
                  ? styles.notfulfilledw
                  : styles.inputd
              }
              name="realiseDate"
              type="date"
              onChange={handleChange}
              value={input.realiseDate}
            />
            {inputFullfilled.clicked && errors.realiseDate && (
              <p className={styles.notfulfilledLabel}>
                Realise Date is required
              </p>
            )}
          </div>
          <div className={styles.inputrating}>
            <label className={styles.label}>Rating: </label>
            <input
              className={
                inputFullfilled.clicked && errors.rating
                  ? styles.notfulfilledw
                  : styles.inputr
              }
              name="rating"
              type="text"
              onChange={handleChange}
              value={input.rating}
              placeholder="Rating"
            />
            {inputFullfilled.clicked && errors.rating && (
              <p className={styles.notfulfilledLabel}>Rating is required</p>
            )}
            {/* <label>Description: </label> */}
          </div>
          <div className={styles.desc}>
            <textarea
              className={
                inputFullfilled.clicked && errors.description
                  ? styles.notfulfilled
                  : styles.textarea
              }
              type="description"
              name="description"
              onChange={handleChange}
              value={input.description}
              placeholder="Description"
            />
            {inputFullfilled.clicked && errors.description && (
              <p className={styles.notfulfilledLabel}>
                Description is required
              </p>
            )}
            {/* <label>Background Image: </label> */}
          </div>
          <div className={styles.inputbkg}>
            <input
              className={
                inputFullfilled.clicked && errors.background_img
                  ? styles.notfulfilled
                  : styles.inputb
              }
              name="background_img"
              type="text"
              onChange={handleChange}
              value={input.background_img}
              placeholder="Background Image"
            />
            {inputFullfilled.clicked && errors.background_img && (
              <p className={styles.notfulfilledLabel}>Background is required</p>
            )}
          </div>
          {/* <div className={styles.genres}> */}
          <div className={styles.sel}>
            <List
              itemToSelect="Genres"
              itemsList={genres}
              selectHandler={handleChange}
            />
          </div>
          <div className={styles.selgenres}>
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
            {inputFullfilled.clicked && errors.genres && (
              <p className={styles.notfulfilledLabel}>Genre is required</p>
            )}
          </div>
          {/* </div> */}
          <div className={styles.platform}>
            <List
              itemToSelect="Platforms"
              itemsList={platforms}
              selectHandler={handleChange}
            />
          </div>
          <div className={styles.selplat}>
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
            {inputFullfilled.clicked && errors.platforms && (
              <p className={styles.notfulfilledLabel}>Platform is required</p>
            )}
          </div>
          <div className={styles.createbtn}>
            <button
              className={styles.create}
              // disabled={!readyToDispatch}
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
        <div className={styles.rigth}>
          <div className={styles.closebtn}>
            <NavLink to="/home">
              <button className={styles.btn}>X</button>
            </NavLink>
          </div>
          <div className={styles.imgcont}>
            {input.background_img.length > 0 && (
              <img
                className={styles.img}
                src={input.background_img}
                alt="Image"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
