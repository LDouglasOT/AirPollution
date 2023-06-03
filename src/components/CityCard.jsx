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
const handExchange=()=>{
if(number==0)return true
if(number == 1) return false
if(number==2)return false
if(number == 3) return true
if(number==4)return true
if(number == 5) return false
if(number==6)return false
if(number == 7) return true
if(number==8)return true
if(number == 9) return false
if(number==10)return false
if(number == 11) return true
if(number==12)return true
if(number == 13) return false
if(number==14)return false
if(number == 15) return true
if(number==16)return true
if(number == 17) return false
if(number==18)return false
if(number == 19) return true
if(number==20)return true
if(number == 21) return false
if(number==22)return false
if(number == 23) return true
if(number==24)return true
if(number == 25) return false
if(number==26)return false
if(number == 27) return true
if(number==28)return true
if(number == 29) return false
if(number==30)return false
if(number == 31) return true
if(number==32)return true
if(number == 33) return false
if(number==34)return false
if(number == 35) return true
if(number==36)return true

if(number == 37) return true
if(number==38)return true
if(number == 39) return false
if(number==40)return false
if(number == 41) return true
if(number==42)return true
if(number == 43) return false
if(number==44)return false
if(number == 45) return true
if(number==46)return true

}

  return (
    <div className={ handExchange() ? "city-card":"city-cardx" } onClick={() => handleNavigation('city')}>
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
