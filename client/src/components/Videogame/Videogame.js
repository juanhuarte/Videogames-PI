export default function Videogame({ name, img, gender, id }) {
  return (
    <div>
      <div>
        <span>{name}</span>
        <span>{gender}</span>
        <img src={img} alt="videogameImg" />
      </div>
    </div>
  );
}
