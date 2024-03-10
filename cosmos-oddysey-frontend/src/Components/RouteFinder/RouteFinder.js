import React, { useState, useEffect } from 'react';
import Planet from '../Planet/planet.js';
import './RouteFinder.css';
import FlightInfo from '../Flight/FlightInfo.js';
import { apiURL } from '../../config'; 
function RouteFinder() {
  const [fromPlanet, setFromPlanet] = useState('');
  const [toPlanet, setToPlanet] = useState('');
  const [mode, setMode] = useState('selecting');
  console.log(apiURL);

  const [flights, setFlightInfo] = useState([]);
  const [displayLimit, setDisplayLimit] = useState(5);

  // Logic for selecting to and from planets
  useEffect(() => {
    if (fromPlanet && toPlanet) {
      setMode('selected');
    } else if (fromPlanet) {
      setMode('deselected');
    } else {
      setMode('selecting');
    }
  }, [fromPlanet, toPlanet]);

  const handlePlanetClick = (planet) => {
    if (mode === 'selecting') {
      setFromPlanet(planet);
    } else if (mode === 'deselected') {
      setToPlanet(planet);
    } else if (mode === 'selected') {
      setMode('deselected');
      return;
    }
  };
  // hardcoded but it gave me a hard time aswell :(
  const validateForm = (event) => {
    event.preventDefault();
    if ((fromPlanet === '' || toPlanet === '') && event.target.value === 'submit') {
      alert('Please select a planet for both Origin and Destination.');
      return;
    }
    if (fromPlanet === toPlanet && fromPlanet !== '' && toPlanet !== '') {
      alert('From and To locations cannot be the same planet.');
      setToPlanet('');
      return;
    }
  };

  const handleSearch = () => {
    if (fromPlanet === '' || toPlanet === '') {
      alert('Please select a planet for both Origin and Destination.');
      return;
    }

    if (fromPlanet === toPlanet) {
      alert('From and To locations cannot be the same planet.');
      setToPlanet('');
      return;
    }
    searchRoutes(fromPlanet, toPlanet);
  };


  const handleClearClick = () => {
    setFromPlanet('');
    setToPlanet('');
    if (flights.length > 0) {
      setFlightInfo([]);
    }
  };
  
  // Sorting the flights by price, duration and distance
  
  function sortRoutesByPrice(flights) {
    flights.forEach(flight => {
      var routeCost = 0;

      for (var i = 0; i < flight.length; i++) {
        routeCost += flight[i]['price'];
      }

      flight.totalCost = Math.round(routeCost * 1000) / 1000;
    });

    flights.sort((a, b) => a.totalCost - b.totalCost);

    return flights;
  }

  function sortRoutesByDuration(flights) {
    flights.forEach(flight => {
      const originDepartureTime = new Date(flight[0].departureTime);
      const destinationArrivalTime = new Date(flight[flight.length - 1].arrivalTime);

      var routeDurationMilliseconds = destinationArrivalTime - originDepartureTime;
      var routeDurationDays = Math.floor(routeDurationMilliseconds / (1000 * 60 * 60 * 24));

      flight.totalDuration = routeDurationDays;
    });

    flights.sort((a, b) => a.totalDuration - b.totalDuration);

    return flights;
  }

  function sortRoutesByDistance(flights) {
    flights.forEach(flight => {
      var routeDistance = 0;
      for (var i = 0; i < flight.length; i++) {
        routeDistance += flight[i].distance;
      }
      flight.totalDistance = routeDistance;
    });

    flights.sort((a, b) => a.totalDistance - b.totalDistance);
    return flights;
  }

  const handleSortByPrice = () => {
    const sortedRoutes = sortRoutesByPrice([...flights]);
    setFlightInfo(sortedRoutes);
  };

  const handleSortByDuration = () => {
    const sortedRoutes = sortRoutesByDuration([...flights]);
    setFlightInfo(sortedRoutes);
  };

  const handleSortByDistance = () => {
    const sortedRoutes = sortRoutesByDistance([...flights]);
    setFlightInfo(sortedRoutes);
  }

  const handleShowMoreRoutes = () => {
    setDisplayLimit(displayLimit + 10);
  }

  // Fetching data from the API
  const searchRoutes = (fromPlanet, toPlanet) => {
    const url = apiURL + `/api/FlightFinder?startLoc=${fromPlanet}&endLoc=${toPlanet}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setFlightInfo(data);
        setDisplayLimit(5);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

  };



  return (
    <div className="flight-finder-container">
      <div className={flights.length > 0 ? "searchbox-with-results" : "searchbox"}>
        <h1>Select an Origin and a Destination</h1>
        <form onSubmit={validateForm}>
          <div className="planet-container">
            <Planet
              planet="Mercury"
              onClick={() => handlePlanetClick("Mercury")}
            />
            <Planet
              planet="Venus"
              onClick={() => handlePlanetClick("Venus")}
            />
            <Planet
              planet="Earth"
              onClick={() => handlePlanetClick("Earth")}
            />
            <Planet
              planet="Mars"
              onClick={() => handlePlanetClick("Mars")}
            />
            <Planet
              planet="Jupiter"
              onClick={() => handlePlanetClick("Jupiter")}
            />
            <Planet
              planet="Saturn"
              onClick={() => handlePlanetClick("Saturn")}
            />
            <Planet
              planet="Uranus"
              onClick={() => handlePlanetClick("Uranus")}
            />
            <Planet
              planet="Neptune"
              onClick={() => handlePlanetClick("Neptune")}
            />
          </div>

          <div className="selected-planets">
            <h2>Origin: {fromPlanet || ''}</h2>
            <h2>Destination: {toPlanet || ''}</h2>
          </div>
          <div className="buttons">
            <input className="search-button" type="submit" onClick={() => handleSearch()} value="Search" />
            <button className="search-button" onClick={() => handleClearClick()}> Clear</button>
          </div>
        </form>
        <div className={flights.length > 0 ? "sort-flights-wrapper" : "sort-flights-wrapper-hidden"}>
          <button className={"sort_button"} onClick={() => handleSortByPrice()}>Price ⬇️</button>
          <button className={"sort_button"} onClick={() => handleSortByDuration()}>Duration ⬇️</button>
          <button className={"sort_button"} onClick={() => handleSortByDistance()}>Distance ⬇️</button>
          <button className={"sort_button"} onClick={() => handleShowMoreRoutes()}>Show More ⬇️</button>
        </div>
        <div className="flight-info-wrapper">
          {flights.slice(0, displayLimit).map((flight, index) => (
            <FlightInfo key={index} flightInfo={flight} />)
          )}
        </div>
      </div >
    </div >
  );
}

export default RouteFinder;
