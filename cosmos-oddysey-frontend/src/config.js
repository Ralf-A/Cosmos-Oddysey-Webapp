// config.js
const apiURL = process.env.NODE_ENV === 'production' 
  ? 'cosmos-oddysey-backend:5299' 
  : 'http://localhost:5299';

module.exports = { apiURL };
