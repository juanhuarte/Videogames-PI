import Videogame from "../Videogame/Videogame";
import styles from "./Videogames.module.css";

export default function Videogames({ videoGames }) {
  return (
    <div className={styles.grid}>
      <div className={styles.videogames}>
        {videoGames &&
          videoGames.map((videogame) => (
            <Videogame
              key={videogame.id}
              name={videogame.name}
              img={videogame.background_img}
              gender={videogame.gender}
              id={videogame.id}
            />
          ))}
      </div>
    </div>
  );
}
