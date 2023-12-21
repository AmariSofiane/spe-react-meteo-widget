import './Card.scss';

function Card({ cityName, temperature, onDelete, description, icon }) {
  return (
    <div className="card">
      <h2 className="city-small">{cityName}</h2>
      <p>{temperature}°C</p>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather Icon" />
      <p className="description">{description}</p>
      {onDelete && <button onClick={onDelete}>X</button>}
    </div>
  );
}

export default Card;
