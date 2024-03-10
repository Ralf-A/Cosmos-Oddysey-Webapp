import React from 'react';
import './planet.css'; 

function getImageSrc(planet) {
    return `https://nineplanets.org/wp-content/uploads/2020/03/${planet.toLowerCase()}.png`;
  }
  
// A function that returns the color based on the planet name
function getColor(planet) {
    switch (planet) {
      case 'Mercury':
        return '#b8b8b8';
      case 'Venus':
        return '#f0c97e';
      case 'Earth':
        return '#4caf50';
      case 'Mars':
        return '#e53935';
      case 'Jupiter':
        return '#f9a825';
      case 'Saturn':
        return '#fdd835';
      case 'Uranus':
        return '#80deea';
      case 'Neptune':
        return '#3f51b5';
      default:
        return '#ffffff';
    }
    
  }
// A React component that renders a button of a planet with an image and a label
function Planet(props) {
    const { planet, onClick } = props;
        return (
      <button className="planet-button" style={{ backgroundColor: getColor(planet) }} onClick={() => onClick(planet)}>
        <img src={getImageSrc(planet)} alt={planet} className="planet-image" />
        <div className="planet-label">{planet}</div>
      </button>
    );
  }
  
  export default Planet;
