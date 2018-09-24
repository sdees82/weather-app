import React, { Component } from 'react';
import CurrentTemp from './CurrentTemp';
import Card from './Card'
import '../App.css';

export const CardList = ({ forecast, city, weatherIcon, weatherDescription, currentDate, currentLowTemp, currentHighTemp}) =>{
    {console.log(forecast)}
    return(
<React.Fragment>
{
//   forecast > 0 ?
    forecast.map((val, index)=>{
            return (
                <Card
                  key={index}
                  city={forecast[index].weather.main} 
                    weatherIcon={weatherIcon}  
                    weatherDescription={weatherDescription} 
                    currentDate="Sept 22 2018" 
                    currentHighTemp={currentHighTemp} 
                    currentLowTemp={currentLowTemp}
                />  
            );
    })
    // :
    // <h1>Loading</h1>
  }
</React.Fragment>
);
}
export default CardList;