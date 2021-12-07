import styles from "./Pagination.module.css";

const Pagination = ({
  videogamesLength,
  changeGames,
  currentPage,
  gamesPerPage,
}) => {
  const pagesNumbers = [];
  let pageNumber = Math.ceil(videogamesLength / gamesPerPage);
  for (var i = 0; i < pageNumber; i++) {
    pagesNumbers.push(i + 1);
  }
  return (
    <div className={styles.grid}>
      <nav className={styles.pagination}>
        <ul>
          {pagesNumbers?.map((number) => {
            return (
              <button
                // className={styles.btn}
                className={
                  currentPage === number ? styles.btnselected : styles.btn
                }
                key={number}
                value={number}
                onClick={(e) => changeGames(e.target.value)}
              >
                {number}
              </button>
            );
            // ) : (
            //   <button
            //     className={styles.btnselected}
            //     key={number}
            //     value={number}
            //     onClick={(e) => changeGames(e.target.value)}
            //   >
            //     {number}
            //   </button>
            // );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
