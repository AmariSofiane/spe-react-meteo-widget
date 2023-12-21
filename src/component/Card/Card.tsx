import './Card.scss'

function Card({ cityName, temperature, onDelete }) {
  return (
    <div className="card">
      <h2>{cityName}</h2>
      <p>Température: {temperature}°C</p>
      {onDelete && <button onClick={onDelete}>X</button>}
    </div>
  );
}

export default Card;
