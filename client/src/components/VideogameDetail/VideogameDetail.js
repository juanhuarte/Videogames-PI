import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { getVideogameDetail } from "../../redux/actions/index";
import { NavLink } from "react-router-dom";

export default function VideogameDetail({ id }) {
  //const { videogameId } = useParams();
  //const videogameId = useParams();
  //console.log("4", videogameId);
  console.log("4", id);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getVideogameDetail(id));
  }, [dispatch]);
  const videogameDetails = useSelector((state) => state.videogameDetails);
  console.log(videogameDetails);
  return (
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
  );
}
