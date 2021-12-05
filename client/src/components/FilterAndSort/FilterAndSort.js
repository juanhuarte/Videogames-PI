import styles from "./FilterAndSort.module.css";

export default function FilterAndSort({
  sort,
  genres,
  handleFilterGenres,
  filterGenre,
}) {
  // const [data, setData] = useState({sortt: 'Order By', filter:'Filter By'})

  // const handleChange = (event) => {

  // }

  return (
    <div className={styles.grid}>
      <div className={styles.container}>
        <div className={styles.sort}>
          <select className={styles.select} onChange={(e) => sort(e)}>
            <option disabled selected>
              Order By
            </option>
            <option value="a-z"> A - Z </option>
            <option value="z-a"> Z - A </option>
            <option value="best"> Best Rating </option>
            <option value="worst"> Worst Rating </option>
          </select>
        </div>
        <div className={styles.filter}>
          <select
            className={styles.select}
            onChange={(e) => handleFilterGenres(e)}
          >
            <option disabled selected>
              Filter By
            </option>
            <option value="allGenres"> All Genres </option>
            <option value="createdVideogames"> Created Games </option>
            {genres?.map((genre) => (
              <option key={genre.id} value={`${genre.name}`}>
                {`${genre.name}`}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.containerLi}>
        {/* {filterGenre && genres.includes(filterGenre) && (
          <span className={styles.gen}>Filter By Genre</span>
        )} */}
        {filterGenre.length > 0 && (
          <span className={styles.fil}>Filter By: </span>
        )}

        {filterGenre?.map((element, i) => (
          <li key={i} className={styles.li}>
            {element}
          </li>
        ))}
      </div>
    </div>
  );
}
