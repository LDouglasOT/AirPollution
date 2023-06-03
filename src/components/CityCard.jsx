import React from 'react';
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CityCard = ({name,continent,flag,lat,lon}) => {
  let dispatch = useDispatch()
  let navigate = useNavigate();


  const handleNavigation = (city) => {
    navigate(`${city}`,{state:{name,continent,lat,lon}})
  }
  return (
    <div className='city-card' onClick={() => handleNavigation('city')}>
      <h4>{name}</h4>
      <p>lat : {lat}</p>
      <img src={flag} alt="country-flag" />
    </div>
  )
}

export default CityCard;
