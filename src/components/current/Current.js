import React, { Component } from "react";
import "../../App.css";

class CurrentTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      longitude: 0,
      latitude: 0,
      currentTemp: "",
      weatherIcon: "",
      weatherDescription: ""
    };
  }

  
  componentWillMount() {
    this.getGeolocation();
  }

  //gets users geolocation and stores within state
  getGeolocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState(prevState => ({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
      }));
      this.getWeatherData();
    });
  };

  //Convert Kelvin to Farenheit
  tempConversion = temp => {
    return Math.floor(((temp - 273.15) * 9) / 5 + 32);
  };

  //Fetches weather data from openweathermap api and stores data within state
  getWeatherData = () => {
    const apiKey = `acd142af8d351a163b7e1a6a16aaec6d`;
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${
        this.state.latitude
      }&lon=${this.state.longitude}&units=imperial&APPID=${apiKey}`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => {
        this.setState(prevState => ({
          weatherIcon: `http://openweathermap.org/img/w/${
            data.list[0].weather[0].icon
          }.png`,
          city: data.city.name,
          currentTemp: Math.floor(data.list[0].main.temp) + `°F`,
          weatherDescription: data.list[0].weather[0].description
        }));
      }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
      });
  };

  render() {
    const { city, weatherIcon, weatherDescription, currentTemp } = this.state;
    return (
      <div className="currentTemp">
        <h1>{city}</h1>
        <img src={weatherIcon} alt="weather icon" />
        <span>{weatherDescription}</span>
        <h2>{currentTemp}</h2>
      </div>
    );
  }
}

export default CurrentTemp;
