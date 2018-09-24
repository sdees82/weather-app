import React, { Component } from 'react';
import CurrentTemp from './CurrentTemp';
import '../App.css';

export const Card = ({ city, weatherIcon, weatherDescription, currentDate, currentLowTemp, currentHighTemp}) =>{
    return(
    <div className="card-wrapper">
        <header>
        <img src={weatherIcon}/>
        <h1>{city}</h1>
        <p>{weatherDescription}</p>
            <p>{currentDate}</p>
        </header>
        <section>
            <p>High Temp: {currentHighTemp}</p>
            <p>Low Temp: {currentLowTemp}</p>
        </section>

    </div>
    );
}

export default Card;