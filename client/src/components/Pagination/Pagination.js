import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { pageRender } from "../Home/functionHelper";
import Videogames from "../Videogames/Videogames";
import { filterByPage } from "../../redux/actions/index";

const Pagination = ({ videogamesLength, changeGames, page, gamesPerPage }) => {
  const dispatch = useDispatch();
  //const [pageNum, setPageNum] = useState(0);

  /*function handleClick(e) {
    //setPageNum(e.target.value);
    console.log("1", e.target.value);
    dispatch(filterByPage(e.target.value));
  }*/

  const pagesNumbers = [];
  let pageNumber = Math.ceil(videogamesLength / gamesPerPage);
  for (var i = 0; i < pageNumber; i++) {
    pagesNumbers.push(i + 1);
  }

  return (
    <div>
      <nav>
        <ul>
          {pagesNumbers?.map((number) => {
            return number !== page ? (
              <button
                key={number}
                value={number}
                onClick={(e) => changeGames(e.target.value)}
              >
                {number}
              </button>
            ) : (
              <button
                //className = {estilos del boton seleccionado}
                key={number}
                value={number}
                onClick={(e) => changeGames(e.target.value)}
              >
                {number}
              </button>
            );
          })}
        </ul>
      </nav>

      {/* {pageNum != 0 && (
        <Videogames videoGames={pageRender(videogames, pageNum)} />
      )}
      {console.log(pageNum)} */}
    </div>
  );
};

export default Pagination;
