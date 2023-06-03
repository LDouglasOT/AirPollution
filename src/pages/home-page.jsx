import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CityCard from '../components/CityCard';
import { selectAllCountries, SelectedContinent } from '../redux/countriesSlice';

function HomePage() {
  const dispatch = useDispatch();
  const countriesArray = useSelector(selectAllCountries);
  const [continent, setContinent] = useState('All');
  let isEven = true;
  let isOdd = false;
  const choice = [{ choice: 'All' }, { choice: 'Africa' }, { choice: 'Asia' }, { choice: 'Europe' }, { choice: 'Oceania' }, { choice: 'Americas' }];
  const handleContinentChange = (continent) => {
    dispatch(SelectedContinent(continent));
  };

  return (
    <>
      <div>
        {choice.map((item) => (
          <button onClick={() => handleContinentChange(item.choice)}>{item.choice}</button>
        ))}
      </div>
      <div className="header">
        <h2>Air Pollution stats</h2>
      </div>

      <div className="container">
        {countriesArray.map((country,key) => (
          <div className='indexa'>
          <CityCard
            key={country.name}
            number={key}
            name={country.name}
            continent={country.continent}
            flag={country.flag}
            lat={country.lat}
            lon={country.lon}
          />
         </div>
        ))}
      </div>
    </>
  );
}

export default HomePage;
