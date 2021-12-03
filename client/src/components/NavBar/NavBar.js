import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./NavBar.module.css";

export default function NavBar({ setCurrentPage, setFilterGenre }) {
  return (
    <div className={styles.navbar}>
      <div className={styles.name}>
        <h3>Videogames</h3>
      </div>
      <div className={styles.search}>
        <SearchBar
          setCurrentPage={setCurrentPage}
          setFilterGenre={setFilterGenre}
        />
      </div>
      <div className={styles.links}>
        <NavLink to="/">
          <button className={styles.landing}>Landing</button>
        </NavLink>
        <NavLink to="/createVideogame">
          <button className={styles.create}>Create Videogame</button>
        </NavLink>
      </div>
    </div>
  );
}
