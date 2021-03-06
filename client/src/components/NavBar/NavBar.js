import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./NavBar.module.css";

export default function NavBar({ setCurrentPage, setFilterGenre, setClicked }) {
  return (
    <div className={styles.navbar}>
      <NavLink className={styles.name} to="/">
        <h3>Videogames</h3>
      </NavLink>
      <div className={styles.search}>
        <SearchBar
          setCurrentPage={setCurrentPage}
          setFilterGenre={setFilterGenre}
          setClicked={setClicked}
        />
      </div>
      <div className={styles.links}>
        <NavLink className={styles.create} to="/createVideogame">
          <h3>Create Videogame</h3>
        </NavLink>
      </div>
    </div>
  );
}
