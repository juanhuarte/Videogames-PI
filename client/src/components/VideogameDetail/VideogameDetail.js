import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { getVideogameDetail } from "../../redux/actions/index";
import { NavLink } from "react-router-dom";
import styles from "./VideogameDetail.module.css";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function VideogameDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getVideogameDetail(id));
  }, [dispatch]);
  const videogameDetails = useSelector((state) => state.videogameDetails);
  return videogameDetails && videogameDetails.id === parseInt(id) ? (
    <div className={styles.detail}>
      <div className={styles.bkg} />
      <div className={styles.container}>
        <div className={styles.close}>
          <NavLink to="/home">
            <button className={styles.closebtn}>
              <IoCloseCircleOutline />
            </button>
          </NavLink>
        </div>
        <div className={styles.name}>
          <span className={styles.spanname}>Name: {videogameDetails.name}</span>
        </div>
        <div className={styles.date}>
          <span className={styles.spand}>
            Realise Date: {videogameDetails.realiseDate}
          </span>
        </div>
        <div className={styles.rating}>
          <span className={styles.spanr}>
            Rating: {videogameDetails.rating}
          </span>
        </div>
        <div className={styles.description}>
          <span>Description: </span>
          <p className={styles.spandescription}>
            {videogameDetails.description}
          </p>
        </div>
        <div className={styles.genre}>
          <label>Genres: </label>
          {videogameDetails.gender?.map((genre, index) => (
            <li key={index}>{genre}</li>
          ))}
        </div>
        <div className={styles.platform}>
          <label>Platforms: </label>
          {videogameDetails.platforms?.map((platform, index) => (
            <li key={index}>{platform}</li>
          ))}
        </div>
        <div className={styles.imgcontainer}>
          <img
            className={styles.img}
            src={videogameDetails.background_img}
            alt="videogameImg"
          />
        </div>
      </div>
    </div>
  ) : (
    <h1>Loading</h1>
  );
}
