import React, { Component } from "react";
import "../../App.css";

class FiveDayTemp extends Component {
  constructor() {
    super();
    this.state = {
      todaysDate: [],
      city: "",
      longitude: 0,
      latitude: 0,
      todaysDate: "",
      lowTemp: [],
      highTemp: [],
      weatherIcon: [],
      weatherDescription: "",
      forecast: []
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

//Fetches weather data from openweathermap api and stores data within state
  getWeatherData = () => {
    const apiKey = `acd142af8d351a163b7e1a6a16aaec6d`;
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${
        this.state.latitude
      }&lon=${this.state.longitude}&units=imperial&APPID=${apiKey}`
    )
      .then(response =>{ 
        if(response.ok) {
          return response.json()
        }
    })
    .then(data => {
        const city = data.city.name;
        let currentDate = [];
        let highTemps = [];
        let lowTemps = [];
        let weatherDescriptions = [];
        let weatherIcons = [];

        const fiveDayForecast = data.list
          .map((day, index) => {
            return day;
          })
          .filter(day => {
            return day.dt_txt.includes("12:00");
          })
          .map((day, index) => {
            currentDate.push(this.props.convertDate(day.dt).slice(0, 4)),
              weatherIcons.push(
                `https://openweathermap.org/img/w/${day.weather[0].icon}.png`
              ),
              weatherDescriptions.push(day.weather[0].description),
              highTemps.push(Math.floor(day.main.temp_max) + `\xB0F`),
              lowTemps.push(Math.floor(day.main.temp_min) + `\xB0F`);
          });

        this.setState(prevState => ({
          forecast: fiveDayForecast,
          todaysDate: currentDate,
          city: city,
          weatherIcon: weatherIcons,
          weatherDescription: weatherDescriptions,
          highTemp: highTemps,
          lowTemp: lowTemps
        }));
      }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
      });;
  };

  render() {
    const {
      forecast,
      city,
      todaysDate,
      weatherIcon,
      weatherDescription,
      lowTemp,
      highTemp
    } = this.state;
    console.log(todaysDate);
    return (
      <div className="fiveDay-wrapper">
        <div className="fiveDay-container">
          <header>
            <h1>Five Day Forecast</h1>
          </header>
          <div>
            {forecast.map((day, index) => {
              return (
                <div key={index} className="card-wrapper">
                  <header>
                    <h1>{todaysDate[index]}</h1>
                  </header>
                  <section className="card-body">
                    <h2>{city}</h2>
                    <img src={weatherIcon[index]} alt="weather icons" />
                    <span>{weatherDescription[index]}</span>
                  </section>
                  <section className="card-bottom">
                    <p>High Temp: {highTemp[index]}</p>
                    <p>Low Temp: {lowTemp[index]}</p>
                  </section>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default FiveDayTemp;
