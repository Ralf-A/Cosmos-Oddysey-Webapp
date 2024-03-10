import "./Reservation.css"
import { useLocation } from 'react-router-dom';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiURL } from '../../config'; // Adjust the path as needed

// Create a new reservation
function CreateReservation() {
    var [passengerFirstName, setPassengerFirstName] = useState('');
    var [passengerLastName, setPassengerLastName] = useState('');
    console.log(apiURL);
    // Update the passenger's first name
    const handleFirstNameChange = (event) => {
        setPassengerFirstName(event.target.value);
    };

    // Update the passenger's last name
    const handleLastNameChange = (event) => {
        setPassengerLastName(event.target.value);
    };
    const navigate = useNavigate();




    // Generate a random travel ID in the format CCC-NNN-NNN (C = letter, N = digit)
    // So id for whole trip
    function generateTravelID() {
        const getRandomLetter = () => String.fromCharCode(Math.floor(Math.random() * 26) + 65);
        const getRandomDigit = () => Math.floor(Math.random() * 10);

        let letters = getRandomLetter() + getRandomLetter() + getRandomLetter();
        let digits = '' + getRandomDigit() + getRandomDigit() + getRandomDigit();
        let digits2 = '' + getRandomDigit() + getRandomDigit() + getRandomDigit();

        return letters + '-' + digits + '-' + digits2;
    }

    // Generate a random reservation ID in the format CCC-NNN (C = letter, N = digit)
    // id's for a single flight
    function generateReservationID() {
        const getRandomLetter = () => String.fromCharCode(Math.floor(Math.random() * 26) + 65);
        const getRandomDigit = () => Math.floor(Math.random() * 10);

        let letters = getRandomLetter() + getRandomLetter() + getRandomLetter();
        let digits = '' + getRandomDigit() + getRandomDigit() + getRandomDigit();

        return letters + '-' + digits;
    }
    // Validate the form and create a new reservation
    //if isValid counter above 15 cycles then not valid flight anymore
    function validateForm(event) {
        event.preventDefault();
        console.log(reservationData.flightInfo[0]['isValid']);
        if (reservationData.flightInfo[0]['isValid'] > 15) {
            alert("This flight is no longer valid.");
            return;
        }

        if (passengerFirstName === '' || passengerLastName === '') {
            alert("Please enter your name.");
            return;
        }

        if (passengerFirstName.length > 25 || passengerLastName.length > 25) {
            alert("Name must be less than 25 characters long.");
            return;
        }

        if (passengerFirstName.length < 2 || passengerLastName.length < 2) {
            alert("Name must be at least 2 characters long.");
            return;
        }

        if (!/^[a-zA-Z -]+$/.test(passengerFirstName) || !/^[a-zA-Z -]+$/.test(passengerLastName)) {
            alert("Name can't contain numbers or special characters.");
            return;
        }

        createTravel();
    }


    const location = useLocation();
    const { reservationData } = location.state || {};

    // Create a new travel and reservations
    function createTravel() {

        const travelID = generateTravelID();

        passengerFirstName = passengerFirstName.trim();
        passengerLastName = passengerLastName.trim();

        passengerFirstName = passengerFirstName.toUpperCase();
        passengerLastName = passengerLastName.toUpperCase();


        fetch(apiURL + '/api/Travel', {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'travelID': travelID,
                'passengerFirstName': passengerFirstName,
                'passengerLastName': passengerLastName,
                'distance': reservationData.flightDistance,
                'duration': reservationData.flightDurationDays,
                'price': reservationData.flightCost,
                'isValid': 0
            })
        }).then(response => {
            // If the travel was created successfully, create the reservations and navigate to the finish page
            if (response.status === 200) {
                alert("Reservation created successfully!");
                navigate('/finished', {
                    state: {
                        travelID: travelID,
                        flight_ids: flight_ids,
                        usedCompanies: reservationData.usedCompanies,
                        visitedPlanets: reservationData.visitedPlanets,
                        flightDistance: reservationData.flightDistance,
                        flightDurationDays: reservationData.flightDurationDays,
                        flightCost: reservationData.flightCost,
                        passengerFirstName: passengerFirstName,
                        passengerLastName: passengerLastName,
                    }
                },
                );
            } else {
                alert("Error creating reservation.");
            }
        }
        ).catch(error => {
            console.error('Error creating reservation:', error);
        });

        // Create a reservation for each flight in the travel
        for (var i = 0; i < reservationData.flightInfo.length; i++) {
            const reservationID = generateReservationID();
            fetch(apiURL + '/api/Reservation', {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'reservationID': reservationID,
                    'travelID': travelID,
                    'flightID': reservationData.flightInfo[i]['flightID'],
                    'isValid': 0,
                })
            }).then(response => {
                if (response.status === 200) {
                    console.log("Reservation created successfully!");


                } else {
                    alert("Error creating Reservation.");
                }
            }
            ).catch(error => {
                console.error('Error creating Reservation:', error);
            });
        }
    }

    // Find all flight id-s in a flight
    var flight_ids = [];
    for (var i = 0; i < reservationData.flightInfo.length; i++) {
        flight_ids.push(reservationData.flightInfo[i]['flightID']);
    }

    return (
        <div>
            <div className={"reservation-container"}>
                <h1>Reservation Details</h1>
                <div className={"reservation-details"}>
                    <div className={"reservation-item"}>
                        <h2>Flight IDs</h2>
                        <p>
                            {flight_ids.map((id, index) => (
                                <React.Fragment key={id}>
                                    {id}{index !== flight_ids.length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </p>
                    </div>
                    <div className={"reservation-item"}>
                        <h2>Price</h2>
                        <p>${reservationData.flightCost}</p>
                    </div>
                    <div className={"reservation-item"}>
                        <h2>Companies</h2>
                        <p>{reservationData.usedCompanies.join(", ")}</p>
                    </div>
                    <div className={"reservation-item"}>
                        <h2>Planets</h2>
                        <p>{reservationData.visitedPlanets.join(" -> ")}</p>
                    </div>
                    <div className={"reservation-item"}>
                        <h2>Distance</h2>
                        <p>{reservationData.flightDistance} km</p>
                    </div>
                    <div className={"reservation-item"}>
                        <h2>Duration (including layovers)</h2>
                        <p>{reservationData.flightDurationDays} days</p>
                    </div>
                </div>
                <form className={"form-container"} onSubmit={validateForm}>
                    <h1>Passenger Details</h1>
                    <div className={"form-item"}>
                        <label htmlFor="firstName"></label><br />
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="First Name"
                            value={passengerFirstName}
                            onChange={handleFirstNameChange}
                        /><br /><br />
                    </div>
                    <div className={"form-item"}>
                        <label htmlFor="lastName"></label><br />
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Last Name"
                            value={passengerLastName}
                            onChange={handleLastNameChange}
                        /><br /><br />
                    </div>
                    <input class="reserve-button" type="submit" value="Submit" />
                    <button class="reserve-button-red" onClick={() => navigate('/')}>Go Back</button>
                </form>
            </div>

        </div>
    )
}

export default CreateReservation;