const currencydictionary = require('./currencydictionary.json');

module.exports = class currencyconverter {

    constructor(currencyObj){
        this.currency = currencyObj.currency ;
        this.value = currencyObj.value;
    }

    perform = function(operator, rate){
        switch(operator){
            case '/':
                return this.value / rate;
                break;
            case '*':
                return this.value * rate;
                break;
        }
    };

    convert = function(to){

    };

    toEuro(){
        return this.convert("euro");
    }
};