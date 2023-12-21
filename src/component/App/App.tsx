import { useState } from 'react';
import Search from '../Search/Search';
import Card from '../Card/Card';
import './App.css'

function App() {
  const [weatherDataList, setWeatherDataList] = useState([]);
  const [idCounter, setIdCounter] = useState(1);

  const addWeatherCard = (weatherData) => {
    setWeatherDataList([...weatherDataList, { ...weatherData, id: idCounter }]);
    setIdCounter(idCounter + 1);
  };

  const removeWeatherCard = (id) => {
    const updatedWeatherList = weatherDataList.filter((weather) => weather.id !== id);
    setWeatherDataList(updatedWeatherList);
  };

  const searchCity = async (cityName: string) => {
    try {
    
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${process.env.apiKey}`;
  
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw Error('Ville non trouvée');
      }
  
      const data = await response.json();
  
      const newWeatherData = {
        id: idCounter,
        cityName: data.name,
        temperature: data.main.temp,
      };
  
      addWeatherCard(newWeatherData);
    } catch (error) {
      console.error('Erreur lors de la récupération des données météo :', error);
    }
  };

  return (
    <div className="App">
      <h1>Widget Météo</h1>
      <Search onSearch={searchCity} />
      <div className="card-container">
        {weatherDataList.map((weatherData) => (
          <Card
            key={weatherData.id}
            cityName={weatherData.cityName}
            temperature={weatherData.temperature}
            onDelete={() => removeWeatherCard(weatherData.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
