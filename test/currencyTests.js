const mocha = require('mocha');
const assert = require('assert');

const dict = require('../models/currency/currencydictionary');
const currencyConverter = require('../models/currency/currencyconverter');

describe('Dictionary Check', function() {
    it('Dict should contain VEF', function() {
        assert(dict.hasOwnProperty('VEF'));
    });

    it('VEF should map to Euro', function() {
        assert(dict.VEF.hasOwnProperty('euro'));
    });
});

describe('Currency Converter Testing', function(){
    const priceObjExample = {
        "currency": "VEF",
        "value": "332.90"
    };

    const expectedEuroVal = "44.09";
    it('Price Obj converted to currencyConverter object correctly', function(){
        assert(typeof new currencyConverter(priceObjExample).toEuro().value == 'string');
    });

    it('VEF converted to Euro correctly', function(){
        assert(new currencyConverter(priceObjExample).toEuro().value === "44.09");
    });

});