import Videogame from "../Videogame/Videogame";

export default function Videogames({ videoGames }) {
  return (
    <div>
      {videoGames &&
        videoGames.map((videogame) => (
          <Videogame
            key={videogame.id}
            name={videogame.name}
            img={videogame.background_img}
            gender={videogame.gender}
            id={videogame.id}
          />
        ))}
    </div>
  );
}
