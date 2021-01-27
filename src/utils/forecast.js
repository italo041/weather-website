const request = require('request');


const forecast = (lat, lng, callback) => {
    
    const url = `http://api.weatherstack.com/current?access_key=152aba23f4b1732de81eaecc51620910&query=${lat},${lng}&units=m`;
    const url_config = { url: url, json: true };

    request(url_config, (error, {body} = {}) => { 

        if(error){
            callback('Unable to connect to weather service',undefined);
        } else if (body.error) {
            callback('Unable to find location',undefined); 
        }
        else {
            const {temperature, feelslike, weather_descriptions, humidity} = body.current;
            callback(undefined,`${weather_descriptions[0]}. It is currently ${temperature} degrees out. There is a ${feelslike}% chance of rain. Humidity is ${humidity}%`); 
        } 
        
    });
}


module.exports = forecast;