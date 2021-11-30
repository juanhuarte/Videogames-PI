import "./App.css";
//import { Route } from "react-router";
import { Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import VideogameDetail from "./components/VideogameDetail/VideogameDetail";
import CreateVideogame from "./components/CreateVideogame/CreateVideogame";

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Landing />
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
      {/* <Route exact path="/videogame/:videogameId">
        <VideogameDetail />
      </Route> */}
      <Route
        exact
        path="/videogame/:id"
        render={({ match }) => <VideogameDetail id={match.params.id} />}
      />
      <Route exact path="/createVideogame">
        <CreateVideogame />
      </Route>
    </div>
  );
}

export default App;
