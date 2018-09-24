import React, { Component } from 'react';
import '../App.css';

const Navbar = ({currentPage, fiveDayPage}) =>{
    return (
        <div className="navbar">
        <ul>
        <li id="current" onClick={currentPage}>Current Day</li>
        <li id="fiveDay" onClick={currentPage}>Five Day Forecast</li>
        </ul>
        </div>
      );
}
 
export default Navbar;
