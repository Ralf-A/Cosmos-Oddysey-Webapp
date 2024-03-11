// config.js
const apiURL = process.env.NODE_ENV === 'production' 
  ? 'http://localhost:8080' 
  : 'http://localhost:5299';

module.exports = { apiURL };
