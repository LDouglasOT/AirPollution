import React, {us} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";


function CityCard({
  name, continent, flag, lat, lon,number
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigation = (city) => {
    navigate(`${city}`, {
      state: {
        name, continent, lat, lon,
      },
    });
  };
const handExchange=(number)=>{
  const cycleLength = 4; // Number of iterations in each cycle
  const positiveIndices = [0, 1]; // Indices that should return true in each cycle
  const negativeIndices = [2, 3]; // Indices that should return false in each cycle
  const cycleIndex = Math.floor(number / cycleLength) % 2;
  const index = number % cycleLength;
  
  if (positiveIndices.includes(index) && cycleIndex % 2 === 0) {
    return true;
  } else if (negativeIndices.includes(index) && cycleIndex % 2 === 1) {
    return true;
  } else {
    return false;
  }

}

  return (
    <div className="city-card" onClick={() => handleNavigation('city')}>
      <FontAwesomeIcon className = "right-arrow-icon" icon={faArrowCircleRight} size="1xs" />
      {number}
      <img src={flag} alt="country-flag" />
      <div className='flexer'>
      <h4>{name}</h4>
      <h4>{lat}</h4>
      </div>
    </div>
  );
}

export default CityCard;
