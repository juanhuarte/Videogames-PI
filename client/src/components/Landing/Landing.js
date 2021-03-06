import { NavLink } from "react-router-dom";
import styles from "./Landing.module.css";
import { FaPowerOff } from "react-icons/fa";

export default function Landing() {
  return (
    <div className={styles.landing}>
      <div className={styles.container}>
        <h1 className={styles.label}>GAME ON</h1>
        <NavLink to="/home">
          <button className={styles.btn}>
            <FaPowerOff />
          </button>
        </NavLink>
      </div>
    </div>
  );
}
