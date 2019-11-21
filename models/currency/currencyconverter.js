const currencydictionary = require('./currencydictionary');

module.exports = class currencyconverter {

    constructor(currencyObj){
        this.currency = currencyObj.currency ;
        this.value = currencyObj.value;
    }

    perform = function(operator, rate){
        switch(operator){
            case '/':
                return parseFloat(this.value) / rate;
            case '*':
                return parseFloat(this.value) * rate;
            case '+':
                return parseFloat(this.value) + rate;
            case '-':
                return parseFloat(this.value) - rate;
            default:
                return parseFloat(this.value);
        }
    };

    convert(to){
        if(!currencydictionary.hasOwnProperty(this.currency)){
            throw new Error(`Cannot convert from ${this.currency}. Does not exist in dictionary`)
        }
        if(!currencydictionary[this.currency].hasOwnProperty(to)){
            throw new Error(`Cannot convert from ${this.currency} to ${to}. Conversion does not exist in dictionary`)
        }
        const conversionObj = currencydictionary[this.currency][to];
        return this.perform(conversionObj.operator, conversionObj.value).toFixed(2);
    };

    toEuro(){
        this.value = this.convert("euro");
        return this;
    }
};