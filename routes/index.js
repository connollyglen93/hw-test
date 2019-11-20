var express = require('express');
var router = express.Router();
const axios = require('axios');

const getPropertyData = async () => {
  try {
    return await axios.get('https://gist.githubusercontent.com/ruimendesM/bf8d095f2e92da94938810b8a8187c21/raw/70b112f88e803bf0f101f2c823a186f3d076d9e6/properties.json');
  } catch (error) {
    console.error(error)
  }
};


/* GET home page. */
router.get('/', async function(req, res, next) {
  const propertyData = await getPropertyData();
  const json = propertyData.data;

  console.log(json.properties[0]);

  res.render('index', { title: Object.keys(json)});

});

module.exports = router;
