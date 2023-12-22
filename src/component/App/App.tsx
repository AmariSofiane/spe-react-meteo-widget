import { useState } from 'react';
import './App.scss'
import Search from '../Search/Search';
import Card from '../Card/Card';

function App() {
  interface IWeatherData {
    id: number;
    cityName: string;
    temperature: number;
    description: string;
    icon: string;
  }

  const [weatherDataList, setWeatherDataList] = useState<IWeatherData[]>([]);
  const [idCounter, setIdCounter] = useState<number>(1);

  const addWeatherCard = (weatherData : IWeatherData) => {
    setWeatherDataList([...weatherDataList, { ...weatherData, id: idCounter }]);
    setIdCounter(idCounter + 1);
  };

  const removeWeatherCard = (id:number) => {
    const updatedWeatherList = weatherDataList.filter((weather) => weather.id !== id);
    setWeatherDataList(updatedWeatherList);
  };

  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  
  const searchCity = async (cityName: string) => {
    try {
    
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}&lang=fr `;
  
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw Error('Ville non trouvée');
      }
  
      const data = await response.json();
  
      const newWeatherData = {
        id: idCounter,
        cityName: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon
        
        

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
            temperature={Math.round(weatherData.temperature)}
            description={weatherData.description}
            icon={weatherData.icon}
            onDelete={() => removeWeatherCard(weatherData.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;