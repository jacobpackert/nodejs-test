// jshint esversion: 6
const http = require('http');
const express = require('express');
var app = express();
const fs = require('fs');



// var server = http.createServer(function(request, response) {
//   response.writeHead(200);
//   response.end(console.log('Hello Http'));
// });
// server.listen(8080, function() {
//   console.log("listening on port 8080");
// });

app.listen(8080, function(){
  console.log("listening on port 8080 with Express");
});

// fs.readFile('hello.txt', 'utf8', function(err, data){
//   if (err) throw err;
//   console.log("succes");
//   console.log(data);
// });

var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyDhQwMLjGfMGRTjr_rjlC850x-EtrSH8RA'
});

// Geocode an address.
// googleMapsClient.geocode({
//   address: 'Haraldsgade 22, 2. th., Copenhagen'
// }, function(err, response) {
//   if (!err) {
//     console.log(response.json.results);
//   }
// });

let distanceResponse;
let distanceResponseString;
let start;
let end;


app.get("/", function(request, response){
  // response.send("hello from express");
  googleMapsClient.distanceMatrix({
    origins: ['Haraldsgade 22, 2200 Copenhagen, Denmark'],
    destinations: ['Øresundsvej 23, Copenhagen, denmark'],
    mode: 'driving'
  }, function(query, callback){
    console.log("inside callback: " + JSON.stringify(callback.json));

    distanceResponse = JSON.stringify(callback.json.rows[0].elements[0].distance.value) / 1000;
    start = JSON.stringify(callback.json.origin_addresses[0]);
    end = JSON.stringify(callback.json.destination_addresses[0]);
    console.log(distanceResponse + " km");
    distanceResponseString = distanceResponse.toString();
  });
  response.send('<html><body><p>There is ' + distanceResponseString + ' km from ' + start + ' to ' + end + '</p></body></html>');
});


//
//
// function logger(){
//   console.log("this is a distance response: " + distanceResponse);
// }
//
// setTimeout(logger, 1000);
//
//
// setTimeout(sender, 1000);
//
// app.get("/distance", function(request, response){
//   response.render('index', function(err, html){
//     response.send(html);
//   });
// });
