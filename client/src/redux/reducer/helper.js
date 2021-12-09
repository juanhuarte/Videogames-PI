export const orderBy = (array, payload) => {
  array.sort(function (a, b) {
    if (payload === "a-z" || payload === "z-a") {
      const videogameNameA = a.name.toLowerCase();
      const videogameNameB = b.name.toLowerCase();
      if (payload === "a-z") {
        if (videogameNameA > videogameNameB) return 1;
        if (videogameNameA < videogameNameB) return -1;
        return 0;
      }
      if (payload === "z-a") {
        if (videogameNameA < videogameNameB) return 1;
        if (videogameNameA > videogameNameB) return -1;
        return 0;
      }
    } else if (payload === "best" || payload === "worst") {
      const videogameNameA = a.rating;
      const videogameNameB = b.rating;
      if (payload === "worst") return videogameNameA - videogameNameB;
      if (payload === "best") return videogameNameB - videogameNameA;
    }
  });
  return array;
};

export const filterGenre = (arr, genre, allVideogames) => {
  if (genre === "All Genres") return allVideogames;
  if (genre === "API Games") {
    let apiGames = allVideogames?.filter(
      (videogame) => typeof videogame.id === "number"
    );
    return apiGames;
  }
  if (genre === "Created Videogames") {
    let videogamesCreated = arr?.filter(
      (videogame) => videogame.id.length > 10
    );
    return videogamesCreated;
  }
  let videogamesByGenre = arr?.filter((videogameGenre) =>
    videogameGenre.gender.includes(genre)
  );
  return videogamesByGenre;
};

export const findCreatedGame = (arr, name) => {
  let videogamesCreated = arr?.filter(
    (videogame) => videogame.id.length > 10 && videogame.name === name
  );

  if (videogamesCreated.length > 0) return true;
  return false;
};
