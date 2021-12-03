import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { getVideogameDetail } from "../../redux/actions/index";
import { NavLink } from "react-router-dom";

export default function VideogameDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getVideogameDetail(id));
  }, [dispatch]);
  const videogameDetails = useSelector((state) => state.videogameDetails);
  return videogameDetails && videogameDetails.id === parseInt(id) ? (
    <div>
      <NavLink to="/home">
        <button>Home</button>
      </NavLink>
      <span>Name: {videogameDetails.name}</span>
      <span>Realise Date: {videogameDetails.realiseDate}</span>
      <span>Rating: {videogameDetails.rating}</span>
      <span>Description: {videogameDetails.description}</span>
      <span>Genre: {videogameDetails.gender}</span>
      <span>Platforms: {videogameDetails.platforms}</span>
      <img src={videogameDetails.background_img} alt="videogameImg" />
    </div>
  ) : (
    <h1>Loading</h1>
  );
}
