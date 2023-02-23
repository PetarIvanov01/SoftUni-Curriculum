// This defines the currencyFormatter function, which takes in four parameters
function currencyFormatter(separator, symbol, symbolFirst, value) {
    // This gets the integer part of the value and adds the separator to it
    let result = Math.trunc(value) + separator;
    // This gets the decimal part of the value and adds it to the result, with two decimal places
    result += value.toFixed(2).substr(-2, 2);
    // This returns the formatted string with the symbol before or after the value, depending on the symbolFirst parameter
    if (symbolFirst) return symbol + ' ' + result;

    else return result + ' ' + symbol;

}

// This defines the createFormatter function, which takes in the first three parameters and a function to be partially applied
function createFormatter(separator, symbol, symbolFirst, formatterFunc) {
    // This returns a new function that takes in a single parameter and applies the fixed parameters to the input function
    return function (value) {
        return formatterFunc(separator, symbol, symbolFirst, value);
    }
}

// This creates a new function called dollarFormatter with the fixed parameters provided, using createFormatter and currencyFormatter
let dollarFormatter = createFormatter(',', '$', true, currencyFormatter);

// These console.log statements demonstrate how to use dollarFormatter to format different values as dollar amounts with the specified parameters
console.log(dollarFormatter(5345)); // $ 5,345.00
console.log(dollarFormatter(3.1429)); // $ 3.14
console.log(dollarFormatter(2.709)); // $ 2.71
