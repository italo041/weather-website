"use strict";

var path = require('path');

var express = require('express');

var hbs = require('hbs');

var geocode = require('./utils/geocode');

var forecast = require('./utils/forecast');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));
var app = express();
var port = process.env.PORT || 3000; // Define paths for express config

var publicDirectoryPath = path.join(__dirname, '../public');
var viewPath = path.join(__dirname, '../templates/views');
var partialsPath = path.join(__dirname, '../templates/partials'); // Setup handlebars engine and views location

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath); // Setup static directory to serve

app.use(express["static"](publicDirectoryPath));
app.get('', function (req, res) {
  res.render('index', {
    title: 'Weather',
    name: 'Fernando Bejarano'
  });
});
app.get('/about', function (req, res) {
  res.render('about', {
    title: 'About Me',
    name: 'Fernando Bejarano'
  });
});
app.get('/help', function (req, res) {
  res.render('help', {
    helpText: 'This is a help text example',
    title: 'Help',
    name: 'Fernando Bejarano'
  });
});
app.get('/weather', function (req, res) {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide a address term'
    });
  }

  geocode(req.query.address, function (error) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        latitude = _ref.latitude,
        longitude = _ref.longitude,
        location = _ref.location;

    if (error) {
      return res.send({
        error: error
      });
    }

    forecast(latitude, longitude, function (error, forecastData) {
      if (error) {
        return res.send({
          error: error
        });
      }

      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address
      });
    });
  });
});
app.get('/products', function (req, res) {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }

  console.log(req.query.search);
  res.send([{
    products: []
  }]);
});
app.get('/help/*', function (req, res) {
  res.render('404', {
    title: '404',
    errorMessage: 'Help article not found',
    name: 'Fernando Bejarano'
  });
});
app.get('*', function (req, res) {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found',
    name: 'Fernando Bejarano'
  });
});
app.listen(port, function () {
  console.log('Server is up on port ' + port);
});