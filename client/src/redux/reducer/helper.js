export const orderBy = (array, payload) => {
  array.sort(function (a, b) {
    if (payload === "a-z" || payload === "z-a") {
      const videogameNameA = a.name.toLowerCase();
      const videogameNameB = b.name.toLowerCase();
      if (payload === "a-z") {
        // ordenar de la a a la z
        if (videogameNameA > videogameNameB) return 1;
        if (videogameNameA < videogameNameB) return -1;
        return 0;
      }
      if (payload === "z-a") {
        // ordenar de z a la aa
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
    console.log(allVideogames);
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
