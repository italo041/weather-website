"use strict";

console.log('Client side javascript file is loaded');
var weatherForm = document.querySelector('form');
var search = document.querySelector('input');
var messageOne = document.querySelector('#message-1');
var messageTwo = document.querySelector('#message-2');
weatherForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var location = search.value;
  messageOne.textContent = 'Loading';
  messageTwo.textContent = '';
  fetch("http://localhost:3000/weather?address=".concat(location)).then(function (response) {
    response.json().then(function (data) {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  })["catch"](function (error) {
    messageTwo.textContent = error;
  });
});