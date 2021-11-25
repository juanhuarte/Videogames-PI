// FUNCTIONS HELPERS

function limitLengthArray(arr) {
  if (arr.length > 15) {
    let first15Games = arr.slice(0, 15);
    return mapping(first15Games);
  }
  return mapping(arr);
}

const mapping = (array) => {
  const videogames = array.map((game) => {
    return {
      id: game.id,
      name: game.name,
      //realiseDate: game.released,
      //rating: game.rating,
      gender: game.genres.map((g) => g.name),
      //platforms: game.parent_platforms.map((p) => p.platform.name),
      background_img: game.background_image,
    };
  });
  return videogames;
};

module.exports = {
  limitLengthArray,
  mapping,
};
