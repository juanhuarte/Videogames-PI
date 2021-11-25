export function pageRender(videogames, pageNum) {
  return videogames.slice(15 * (pageNum - 1), 15 + 15 * (pageNum - 1));
}
