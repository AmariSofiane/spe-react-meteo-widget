import React, { useState } from 'react';
import './Search.scss'


interface SearchProps {
  onSearch: (city: string) => void;
}

function Search({ onSearch }: SearchProps) {
  const [cityName, setCityName] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(event.target.value);
  };

  const handleSearch = () => {
    onSearch(cityName);
    setCityName('');
  };

  return (
    <div className='search-container'>
      <input
        type="text"
        placeholder="Entrez le nom de la ville"
        value={cityName}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Rechercher</button>
    </div>
  );
}

export default Search;