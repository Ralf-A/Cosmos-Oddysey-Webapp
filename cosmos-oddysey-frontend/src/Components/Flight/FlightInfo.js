import "./FlightInfo.css";
import {useNavigate} from "react-router-dom";

function FlightInfo({flightInfo}) {

    // Find duration of flight (difference between arrival and departure times)
    const originDepartureTime = new Date(flightInfo[0].departureTime);
    const destinationArrivalTime = new Date(flightInfo[flightInfo.length - 1].arrivalTime);

    var flightDurationMilliseconds = destinationArrivalTime - originDepartureTime;
    var flightDurationDays = Math.floor(flightDurationMilliseconds / (1000 * 60 * 60 * 24));

    // Find total distance of flight (sum of all distances between stops)
    var flightDistance = 0;
    for (var i = 0; i < flightInfo.length; i++) {
        flightDistance += flightInfo[i].distance;
    }

    // Find total cost of flight (sum of all costs between stops)
    var flightCost = 0;
    for (var i = 0; i < flightInfo.length; i++) {
        flightCost += flightInfo[i]['price'];
    }
    flightCost = Math.round(flightCost * 100) / 100;

    // Find which planets are visited
    var visitedPlanets = [];
    for (var i = 0; i < flightInfo.length; i++) {
        if (!visitedPlanets.includes(flightInfo[i]['origin'])) {
            visitedPlanets.push(flightInfo[i]['origin']);
        }
        if (!visitedPlanets.includes(flightInfo[i]['destination'])) {
            visitedPlanets.push(flightInfo[i]['destination']);
        }
    }

    // When the reserve button is clicked, navigate to the reservation page with the reservation data
    const navigate = useNavigate();
    const handleReserveClick = () => {
        const reservationData = {
            flightInfo,
            flightCost,
            usedCompanies,
            visitedPlanets,
            flightDistance,
            flightDurationDays,
        };
        
        navigate('/reservation', { state: { reservationData } });
    };

    // Find which companies are used
    var usedCompanies = [];
    for (var i = 0; i < flightInfo.length; i++) {
        if (!usedCompanies.includes(flightInfo[i]['companyName'])) {
            usedCompanies.push(flightInfo[i]['companyName']);
        }
    }

    return (
        <div className="flight-info-container">
            <div className="flight-info-body">
                <div className="flight-info-body-item">
                    <h2>Departure time</h2>
                    <p>{originDepartureTime.toLocaleString()}</p>
                </div>
                <div className="flight-info-body-item">
                    <h2>Arrival time</h2>
                    <p>{destinationArrivalTime.toLocaleString()}</p>
                </div>
                <div className="flight-info-body-item">
                    <h2>Duration</h2>
                    <p>{flightDurationDays} Days</p>
                </div>
                <div className="flight-info-body-item">
                    <h2>Distance :</h2>
                    <p>{flightDistance} Kilometers</p>
                </div>
                <div className="flight-info-body-item">
                    <h2>Cost</h2>
                    <p>${flightCost}</p>
                </div>
                <div className="flight-info-body-item">
                    <h2>Route</h2>
                    <p>{visitedPlanets.join(' -> ')}</p>
                </div>
                <div className="flight-info-body-item">
                    <h2>Companies Used</h2>
                    <p>{usedCompanies.join(', ')}</p>
                </div>
                <button className="reserve-button" onClick={handleReserveClick}>Reserve</button>
            </div>
        </div>
    );
}

export default FlightInfo;