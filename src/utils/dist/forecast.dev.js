"use strict";

var request = require('request');

var forecast = function forecast(lat, lng, callback) {
  var url = "http://api.weatherstack.com/current?access_key=152aba23f4b1732de81eaecc51620910&query=".concat(lat, ",").concat(lng, "&units=m");
  var url_config = {
    url: url,
    json: true
  };
  request(url_config, function (error) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        body = _ref.body;

    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      var _body$current = body.current,
          temperature = _body$current.temperature,
          feelslike = _body$current.feelslike,
          weather_descriptions = _body$current.weather_descriptions,
          humidity = _body$current.humidity;
      callback(undefined, "".concat(weather_descriptions[0], ". It is currently ").concat(temperature, " degrees out. There is a ").concat(feelslike, "% chance of rain. Humidity is ").concat(humidity, "%"));
    }
  });
};

module.exports = forecast;