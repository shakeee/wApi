const request = require('request');

var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/51af6d0576d4c8bf3d8290322949d1a2/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Forecast.io server');
        } else if (response.statusCode === 400) {
            callback('Unable to fetch weather');
        } else if (response.statusCode === 200) {
            fTemp = body.currently.temperature;
            fApTemp = body.currently.apparentTemperature;
            funcTemp = temp => {
                fToCel = (temp - 32) * 5 / 9;
                return fToCel.toFixed(2) + '\xB0C'
            }
            callback(undefined, {
                temperature: funcTemp(fTemp),
                apparentTemperature: funcTemp(fApTemp)
            })
            // var fTemp = body.currently.temperature;
            // var fToCel = (fTemp - 32) * 5 / 9;
            // var temperatura = fToCel.toFixed(1) + '\xB0C';
            // console.log('Zona: ' + body.timezone + ' ' + 'Temperatura: ' + temperatura);
        }
    });
};

module.exports.getWeather = getWeather;