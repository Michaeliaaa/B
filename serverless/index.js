const functions = require('@google-cloud/functions-framework');
const axios = require('axios');

functions.http('getRates', (req, res) => {  
    res.set(
        'Access-Control-Allow-Origin', '*'
    )
    
    let topTwentyTradedCurrencies = [
        "USD", "EUR", "JPY", "GBP", "AUD",
        "CAD", "CHF", "CNY", "HKD", "NZD",
        "SEK", "KRW", "SGD", "NOK", "MXN",
        "INR", "RUB", "ZAR", "TRY", "BRL"
    ]

    axios.get("https://api.exchangerate.host/latest?base=SGD")
        .then(response => {
            let rates = response.data.rates;
            let result = {};
            topTwentyTradedCurrencies.forEach(currency => {
                result[currency] = rates[currency];
            });
            res.status(200).send(result);
        }).catch(error => {
            res.status(500).send(error);
        }
    );
});
