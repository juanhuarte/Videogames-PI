import styles from "./Videogame.module.css";
import { NavLink } from "react-router-dom";

export default function Videogame({ name, img, gender, id }) {
  return (
    <div className={styles.videogame}>
      <NavLink className={styles.nav} to={`/videogame/${id}`}>
        <img src={img} alt="videogameImg" className={styles.img} />
      </NavLink>
      <div className={styles.text}>
        <span className={styles.name}>{name}</span>
        <div className={styles.genres}>
          {gender?.map((genre) => (
            <span key={id} className={styles.genre}>
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
