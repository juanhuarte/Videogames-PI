import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import {
  createVideogame,
  getAllVideogames,
  getAllGenders,
  findCreatedGamesByName,
} from "../../redux/actions/index";
import List from "../List/List";
import { NavLink } from "react-router-dom";
import styles from "./CreateVideogame.module.css";
import { validationFunc } from "./validationFunc";
import { IoCloseCircleOutline } from "react-icons/io5";

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
  const [clickedSel, setClickedSel] = useState({
    platforms: true,
    genres: true,
  });
  const allReadyCreated = useSelector((state) => state.boolean);
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

  const handleChange = (event) => {
    if (event.target.name === "Genres") {
      // Trabajo con el estado anterior del input
      setInput((input) => {
        const newInput = {
          ...input,
          genres: [...input.genres, parseInt(event.target.value)],
        };
        const errors = validationFunc(newInput);
        setErrors(errors);
        setClickedSel({ ...clickedSel, genres: false });
        if (!Object.keys(errors).length) setReadyToDispatch(true);
        else setReadyToDispatch(false);
        return newInput;
      });
    } else if (event.target.name === "Platforms") {
      setInput((input) => {
        const newInput = {
          ...input,
          platforms: [...input.platforms, event.target.value],
        };
        const errors = validationFunc(newInput);
        setErrors(errors);
        setClickedSel({ ...clickedSel, platforms: false });
        if (!Object.keys(errors).length) setReadyToDispatch(true);
        else setReadyToDispatch(false);
        return newInput;
      });
    } else {
      setInput((input) => {
        const newInput = {
          ...input,
          [event.target.name]: event.target.value,
        };
        const errors = validationFunc(newInput);
        setErrors(errors);
        if (event.target.name === "name") {
          dispatch(findCreatedGamesByName(newInput.name));
        }
        if (!Object.keys(errors).length) {
          setReadyToDispatch(true);
        } else setReadyToDispatch(false);
        return newInput;
      });
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (readyToDispatch === true) {
      if (!allReadyCreated) {
        dispatch(createVideogame(input));
        dispatch(getAllVideogames()); // despacho esta accion para que se actualice el array donde tengo todos los juegos(los creados y los de la api)
        dispatch(getAllGenders());
        setInput({ ...input, redirect: true });
        setInputFullfilled({ ...inputFullfilled, boolean: true });
        setReadyToDispatch(false);
      } else alert("This videogame was all ready created");
    } else {
      setInputFullfilled({ ...inputFullfilled, clicked: true });
      const errors = validationFunc(input);
      setErrors(errors);
    }
  };

  function handleDelete(id) {
    setInput((input) => {
      const newInput = {
        ...input,
        genres: input.genres?.filter((genre) => genre != id),
      };
      const errors = validationFunc(newInput);
      setErrors(errors);
      setClickedSel({ ...clickedSel, genres: true });
      if (!Object.keys(errors).length) setReadyToDispatch(true);
      else setReadyToDispatch(false);
      return newInput;
    });
  }

  function handleDeletePlatforms(name) {
    setInput((input) => {
      const newInput = {
        ...input,
        platforms: input.platforms?.filter((platform) => platform !== name),
      };
      const errors = validationFunc(newInput);
      setErrors(errors);
      setClickedSel({ ...clickedSel, platforms: true });
      if (!Object.keys(errors).length) setReadyToDispatch(true);
      else setReadyToDispatch(false);
      return newInput;
    });
  }
  return inputFullfilled.boolean === true ? (
    <Redirect to="/home" />
  ) : (
    <div className={styles.createvg}>
      <div className={styles.bkg} />
      <div className={styles.container}>
        <form onSubmit={onSubmit} className={styles.form}>
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
              placeholder={
                inputFullfilled.clicked && errors.name ? errors.name : "Name"
              }
            />
          </div>
          <div className={styles.inputdate}>
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
          </div>
          <div className={styles.inputrating}>
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
              placeholder={
                inputFullfilled.clicked && errors.rating
                  ? errors.rating
                  : "Rating: 0 - 5"
              }
            />
          </div>
          <div className={styles.desc}>
            <textarea
              className={
                inputFullfilled.clicked && errors.description
                  ? styles.notfulfilledtextarea
                  : styles.textarea
              }
              type="description"
              name="description"
              onChange={handleChange}
              value={input.description}
              placeholder={
                inputFullfilled.clicked && errors.description
                  ? errors.description
                  : "Description"
              }
            />
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
              placeholder={
                inputFullfilled.clicked && errors.background_img
                  ? errors.background_img
                  : "Background Image"
              }
            />
          </div>

          <div className={styles.sel}>
            <List
              itemToSelect="Genres"
              itemsList={genres}
              selectHandler={handleChange}
              clickedSel={clickedSel}
            />
          </div>
          <div
            className={
              inputFullfilled.clicked && errors.genres
                ? styles.notfulfilledgenres
                : styles.selgenres
            }
          >
            {inputFullfilled.clicked && errors.genres && (
              <label className={styles.labels}>{errors.genres}</label>
            )}
            {genres?.map((genre, i) =>
              input.genres.includes(parseInt(genre.id)) ? (
                <div key={i} className={styles.list}>
                  <li>{genre.name}</li>
                  <button
                    className={styles.btnclose}
                    onClick={() => handleDelete(genre.id)}
                  >
                    <IoCloseCircleOutline />
                  </button>
                </div>
              ) : null
            )}
          </div>

          <div className={styles.platform}>
            <List
              itemToSelect="Platforms"
              itemsList={platforms}
              selectHandler={handleChange}
              clickedSel={clickedSel}
            />
          </div>
          <div
            className={
              inputFullfilled.clicked && errors.platforms
                ? styles.notfulfilledPlatform
                : styles.selplat
            }
          >
            {inputFullfilled.clicked && errors.platforms && (
              <label className={styles.labels}>{errors.platforms}</label>
            )}

            {input.platforms?.map((platform, i) => (
              <div key={i} className={styles.list}>
                <li>{platform}</li>
                <button
                  className={styles.btnclose}
                  onClick={() => handleDeletePlatforms(platform)}
                >
                  <IoCloseCircleOutline />
                </button>
              </div>
            ))}
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
              <button className={styles.btnclose}>
                <IoCloseCircleOutline />
              </button>
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
