import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Current from './components/CurrentTemp';
import FiveDayTemp from './components/FiveDayTemp';

class App extends Component {
  constructor(){
    super();
    this.state = {
      currentPage: true,
      geoLocationSupported: "",
      
    }
  }

  currentDayPage = (e) =>{

    if(e.target.id === "current"){
      this.setState(prevState=>({
        currentPage: true
      }));
    }else{
      this.setState(prevState=>({
        currentPage: false
      }));
    }
    
  }


  render() {
    return (
      <div className="App">
      <Navbar currentPage={this.currentDayPage}/>
      <div className="App-wrapper">
      {
        this.state.currentPage === true ?
        <Current/>
        :
        <FiveDayTemp/>
      }

      </div>
      </div>
    );
  }
}

export default App;
