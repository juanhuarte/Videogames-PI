import React from "react";
import styles from "./App.module.css";
//import { Route } from "react-router";
import { Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import VideogameDetail from "./components/VideogameDetail/VideogameDetail";
import CreateVideogame from "./components/CreateVideogame/CreateVideogame";
import { getAllVideogames, getAllGenders } from "./redux/actions/index";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  //NO OLVIDARME DE DESCOMENTAR ESTO CUANDO FUNQUE LA API

  React.useEffect(() => {
    dispatch(getAllVideogames());
    dispatch(getAllGenders());
  }, []);

  return (
    <div className={styles.grid}>
      <Route exact path="/">
        <Landing />
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
      {/* <Route exact path="/videogame/:videogameId">
        <VideogameDetail />
      </Route> */}
      <Route exact path="/videogame/:id">
        <VideogameDetail />
      </Route>
      <Route exact path="/createVideogame">
        <CreateVideogame />
      </Route>
    </div>
  );
}

export default App;

/*
render={({ match }) => <VideogameDetail id={match.params.id}/>}
*/
