import { Route } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      <NavLink to="/home">
        <button>Home</button>
      </NavLink>
    </div>
  );
}
