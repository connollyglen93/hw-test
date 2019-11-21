const mocha = require('mocha');
const assert = require('assert');
const axios = require('axios');

const config = require('../config/config');

describe('Config Checking', function(){
    it('Config should contain data URL', function() {
        assert(config.hasOwnProperty('dataUrl') && typeof config.dataUrl == 'string');
    });

    it('Config should contain network URL', function() {
        assert(config.hasOwnProperty('networkUrl') && typeof config.networkUrl == 'string');
    });
});

describe('Network Request Tests', function(){
    it('Data URL returns a valid json obj', async function() {
        const jsonResponse = await axios.get(config.dataUrl);
        assert(jsonResponse.hasOwnProperty('data') && jsonResponse.data.hasOwnProperty('properties') && jsonResponse.data.properties.length);
    });

    it('Network URL should respond with 0', async function() {
        const networkResponse = await axios.get(config.networkUrl, {
            params: {
                action: 'test',
                duration: 1
            }
        });
        assert(networkResponse.hasOwnProperty('data') && networkResponse.data === 0);
    });
});