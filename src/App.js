import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Current from "./components/current/Current";
import FiveDayTemp from "./components/fiveday/FiveDay";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: true
    };
  }
  getGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState(prevState => ({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
      }));
    });
    return;
  };

  currentDayPage = e => {
    if (e.target.id === "current") {
      this.setState(prevState => ({
        currentPage: true
      }));
    } else {
      this.setState(prevState => ({
        currentPage: false
      }));
    }
  };

  convertDate = currentFormat => {
    const newFormat = new Date(currentFormat * 1000).toDateString();
    return newFormat;
  };

  render() {
    return (
      <div className="App">
        <Navbar currentPage={this.currentDayPage} />
        <div className="App-wrapper">
          <div className="App-overlay">
            {this.state.currentPage === true ? (
              <Current convertDate={this.convertDate} />
            ) : (
              <FiveDayTemp convertDate={this.convertDate} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
