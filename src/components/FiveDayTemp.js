import React, { Component } from 'react';
import CardList from './CardList'
import '../App.css';

class FiveDayTemp extends Component {
  constructor(){
    super();
    this.state = {
      geoLocationSupported: "",
      city: "",
      longitude: 0,
      latitude: 0,
      todaysDate:"",
      lowTemp:0,
      highTemp: 0,
      weatherIcon: "",
      weatherDescription: "",
      forecast: []
    }
  }

  componentWillMount(){
    this.getGeolocation();
  }

  getGeolocation = () =>{
    navigator.geolocation.getCurrentPosition((position)=>{
      this.setState(prevState=>({
        longitude: position.coords.longitude, 
        latitude: position.coords.latitude
    }));
      this.getWeatherData();
  });
}

  tempConversion = (temp) =>{
    return Math.floor( (temp - 273.15) * 9/5 + 32);
  }
 

  getWeatherData = () =>{
    const apiKey = `acd142af8d351a163b7e1a6a16aaec6d`;
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.state.latitude}&lon=${this.state.longitude}&APPID=${apiKey}`)
    .then(response => response.json())
    .then(data => {
     
      const fiveDayForecast = data.list.map((day, index)=>{
        if(index <= 4){
          return day;
        }
      }).filter(day=>{
        return day !== undefined;
      });

      this.setState(prevState=>({
        forecast: fiveDayForecast 
      }));
    });
  }

  render() {
    
    const {forecast} = this.state;

    return (
      <div className="fiveDay-wrapper">
      <CardList forecast={forecast} city={this.state.city} weatherIcon={this.state.weatherIcon}  weatherDescription={this.state.weatherDescription} currentDate="Sept 22 2018" currentHighTemp={this.state.highTemp} currentLowTemp={this.state.lowTemp} />
      </div>
    );
  }
}

export default FiveDayTemp;
