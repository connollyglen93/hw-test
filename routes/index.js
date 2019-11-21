var express = require('express');
var router = express.Router();
const axios = require('axios');
const config = require('../config/config');
const currencyConverter = require('../models/currency/currencyconverter');

const getPropertyData = async () => {
  try {
    elapsed_time('reset-timer');
    const jsonResponse = await axios.get(config.dataUrl);
    generateNetworkStats('load-json', elapsed_time('load-json'));
    return jsonResponse;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const generateNetworkStats = async (action, duration) => {
  try {
    axios.get(config.networkUrl, {
      params: {
        action: action,
        duration: duration
      }
    });
  } catch (error) {
    console.error(error);
  }
};

var start = process.hrtime();

var elapsed_time = function(note){
  var precision = 3; // 3 decimal places
  var elapsedMs = process.hrtime(start)[1] / 1000000; // divide by a million to get nano to milli
  var elapsedS = process.hrtime(start)[0] ? process.hrtime(start)[0] : "";
  var elapsed = elapsedS + elapsedMs.toFixed(precision);
  console.log(elapsed + " ms - " + note); // print message + time
  start = process.hrtime(); // reset the timer
  return elapsed;
};


/* GET home page. */
router.get('/', async function(req, res, next) {
   //reset time elapsed
  const propertyData = await getPropertyData();
  let json = {};
  if(propertyData.hasOwnProperty('data')){
    json = propertyData.data;
    json.properties.forEach(function(p) {
      if(p.hasOwnProperty('overallRating') && p.overallRating !== null){
        p.decimalRating = (p.overallRating.overall % 10 === 0) ? parseFloat(p.overallRating.overall / 10) : parseFloat(p.overallRating.overall / 10).toFixed(1);
      }else{
        p.decimalRating = 0;
      }
      p.lowestPricePerNight = new currencyConverter(p.lowestPricePerNight).toEuro();
    });
  }else{
    json = {error: "There was an error retrieving the data"}
  }

  res.render('index', { title: "Hostelworld Test", json: json});

});

module.exports = router;
