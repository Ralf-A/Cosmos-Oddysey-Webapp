import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";

// ReservedTravel component, quite straightforward, displays info about the made reservation
const ReservedTravel = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { state } = location;
    const { travelID, flight_ids, usedCompanies, visitedPlanets, flightDistance, flightDurationDays, flightCost, passengerFirstName, passengerLastName } = state;

    const handleNavigate = () => {
        navigate('/');
    };

    return (
        <div class='reservation-container'>
            <h1>Reserved Travel Details</h1>
            <p><strong>Travel ID:</strong> {travelID}</p>
            <p><strong>Flight IDs:</strong> {flight_ids.join(', ')}</p>
            <p><strong>Used Companies:</strong> {usedCompanies.join(', ')}</p>
            <p><strong>Visited Planets:</strong> {visitedPlanets.join(', ')}</p>
            <p><strong>Flight Distance:</strong> {flightDistance} km</p>
            <p><strong>Flight Duration (Days):</strong> {flightDurationDays}</p>
            <p><strong>Flight Cost:</strong> ${flightCost}</p>
            <p><strong>Passenger Name:</strong> {passengerFirstName} {passengerLastName}</p>
            
            <button class='reserve-button' onClick={handleNavigate}>Go to Home</button>
        </div>
    );
};

export default ReservedTravel;
