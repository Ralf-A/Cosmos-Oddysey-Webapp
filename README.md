# Cosmos Odyssey - React Frontend

## Introduction

Welcome to the frontend repository of **Cosmos Odyssey**, the web application that brings you the best solar system travel deals. Navigate through various planets and find the most suitable routes at competitive prices. Make your reservation and embark on an interplanetary adventure!

## Features

- **Travel Selection**: Choose your origin and destination from different planets within our solar system.
- **Route Options**: View possible routes with prices provided by various transportation companies.
- **Dynamic Pricing**: Prices update regularly until the pricelist expires.
- **Filters and Sorting**: Filter routes by travel company and sort by price, distance, or travel time.
- **Reservations**: Securely make a reservation with your name on your preferred route.
- **Pricelist History**: Access up to the last 15 active pricelists.

## API Reference

The active routes and prices are fetched from the following API endpoint:
`https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices`

# Cosmos-Odyssey-Backend API Documentation

## Version: 1.0

Testing build URL: `http://localhost:5299`
Docker/production build URL: `http://localhost:8080`

### Flight API

#### GET /api/Flight
- **Description**: Retrieve a list of flights.
- **Parameters**: None
- **Responses**:
  - 200: Success

#### POST /api/Flight
- **Description**: Create a new flight entry.
- **Parameters**: None
- **Request Body**:
  ```json
  {
    "flightID": "string",
    "companyName": "string",
    "origin": "string",
    "destination": "string",
    "price": 0,
    "distance": 0,
    "departureTime": "2024-03-11T00:03:17.174Z",
    "arrivalTime": "2024-03-11T00:03:17.174Z",
    "validUntil": "2024-03-11T00:03:17.174Z",
    "isValid": 0
  }

#### GET /api/FlightFinder
- **Description**: Find flights between two planets.
- **Parameters**:
  - `startLoc` (string, query): Starting planet.
  - `endLoc` (string, query): Ending planet.
- **Responses**:
  - **200**: Success

### Reservation API

#### GET /api/Reservation
- **Description**: Retrieve reservation details.
- **Parameters**:
  - `reservationId` (string, query): Unique identifier for the reservation.
- **Responses**:
  - **200**: Success

#### POST /api/Reservation
- **Description**: Create a new reservation.
- **Parameters**: None
- **Request Body**:
  ```json
  {
    "reservationID": "string",
    "travelID": "string",
    "flightID": "string",
    "isValid": 0
  }
  
### Travel API

#### GET /api/Travel
- **Description**: Retrieve details for a travel (consisting of one to many flights)
- **Parameters**: None
- **Responses**:
- **200**: Success
    
#### POST /api/Travel
- **Description**: Create a new travel (consisting of one to many flights)
- **Parameters**: None
- **Request Body**:
  ```json
  {
  "travelID": "string",
  "passengerFirstName": "string",
  "passengerLastName": "string",
  "distance": 0,
  "duration": 0,
  "price": 0,
  "isValid": 0
}
