import React from 'react';

const CityCard = ({name,continent,flag,lat,lon}) => {


  const handleNavigation = (city) => {
  }
  return (
    <>

    <h1>{name}</h1>
    <h2>{continent}</h2>
    <img src={flag} style={{width:'150px',height:'150px'}} alt="" />
    <button className='view-polution-btn' onClick={() => handleNavigation('city')}>
    view polution
    </button>
    </>
  )
}

const Pollution = () => {
  let pollutionData = {
		co:"co",
		no:"no",
		no2:"no2",
		stringQuality:"stringQuality"
	}

	let data={
		name:"name"
	}
  return (
<>
<div className="pollution-card">
<div className="pollution-details">
  <h1>{data.name}</h1>
  <h2>Pollution Data</h2>
  <p>Air Pollutants</p>
  <p>no : {pollutionData.no}</p>
  <p>co : {pollutionData.co}</p>
  <p>no2 : {pollutionData.no2}</p>
  <br />
  <p>Air Quality:  {pollutionData.stringQuality}</p>
</div>
</div>

<button onClick={handleGoBackButton}>Go Back</button>
</>
  )
}

export {Pollution,CityCard};
