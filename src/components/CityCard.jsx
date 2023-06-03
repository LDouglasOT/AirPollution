import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";


function CityCard({
  name, continent, flag, lat, lon,
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
  return (
    <div className="city-card" onClick={() => handleNavigation('city')}>
      <FontAwesomeIcon className = "right-arrow-icon" icon={faArrowCircleRight} size="1xs" />
      <img src={flag} alt="country-flag" />
      <div className='flexer'>
      <h4>{name}</h4>
      <h4>{lat}</h4>
      </div>
    </div>
  );
}

export default CityCard;
