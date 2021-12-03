import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./NavBar.module.css";

export default function NavBar({ setCurrentPage, setFilterGenre }) {
  return (
    <div className={styles.navbar}>
      {/* <div className={styles.name}> */}
      <NavLink className={styles.name} to="/">
        <h3>Videogames</h3>
      </NavLink>
      {/* </div> */}
      <div className={styles.search}>
        <SearchBar
          setCurrentPage={setCurrentPage}
          setFilterGenre={setFilterGenre}
        />
      </div>
      <div className={styles.links}>
        {/* <NavLink to="/">
          <button className={styles.landing}>Landing</button>
        </NavLink> */}
        <NavLink className={styles.create} to="/createVideogame">
          <h3>Create Videogame</h3>
        </NavLink>
      </div>
    </div>
  );
}
