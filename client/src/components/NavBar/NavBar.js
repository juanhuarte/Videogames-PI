import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

export default function NavBar({
  setCurrentPage,
  sort,
  genres,
  handleFilterGenres,
}) {
  return (
    <div>
      <SearchBar setCurrentPage={setCurrentPage} />
      <select onChange={(e) => sort(e)}>
        <option disabled selected>
          Order By
        </option>
        <option value="a-z"> A - Z </option>
        <option value="z-a"> Z - A </option>
        <option value="best"> Best Rating </option>
        <option value="worst"> Worst Rating </option>
      </select>
      <select onChange={(e) => handleFilterGenres(e)}>
        <option disabled selected>
          Genres
        </option>
        <option value="allGenres"> All Genres </option>
        {genres?.map((genre) => (
          <option key={genre.id} value={`${genre.name}`}>
            {`${genre.name}`}
          </option>
        ))}
      </select>
      <NavLink to="/createVideogame">
        <button>Create Videogame</button>
      </NavLink>
    </div>
  );
}
