import { Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styles from "./Landing.module.css";

export default function Landing() {
  return (
    <div className={styles.landing}>
      <NavLink to="/home">
        <button>Home</button>
      </NavLink>
    </div>
  );
}
