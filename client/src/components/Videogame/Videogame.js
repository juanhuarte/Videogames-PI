import styles from "./Videogame.module.css";
import { NavLink } from "react-router-dom";

export default function Videogame({ name, img, gender, id }) {
  return (
    <div className={styles.videogame}>
      {id === "a124568" ? (
        <img src={img} alt="videogameImg" className={styles.img} />
      ) : (
        <NavLink className={styles.nav} to={`/videogame/${id}`}>
          <img src={img} alt="videogameImg" className={styles.img} />
        </NavLink>
      )}
      <div className={styles.text}>
        <span className={styles.name}>{name}</span>
        <div className={styles.genres}>
          {gender?.map((genre, index) => (
            <span key={index} className={styles.genre}>
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
