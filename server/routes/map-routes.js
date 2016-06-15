"use strict";
var http = require('http');
var https = require('https');

exports.getNearbyPlaces = function (req, res) {
  var lat = req.body.lat;
  var lng = req.body.lng;
  var path = "/maps/api/place/nearbysearch/json?location=" + lat + "," + lng + "&radius=500&key=AIzaSyDtFlHY3zvCOq72mg6D4RPrw10PnZTTxpw";
  var options = {
    host: "maps.googleapis.com",
    path: path
  };
  https.get(options, function(resp){
    var responseBody = "";
    resp.on('data', function(chunk){
      responseBody += chunk;
    });
    resp.on('end', function() {
      var placesData = JSON.parse(responseBody);
      res.send(placesData);
    });
  }).on("error", function(e){
    console.log("Got error: " + e.message);
  });
};

exports.getLocationDetails = function (req, res) {
  var lat = req.body.lat;
  var lng = req.body.lng;
  var path = "/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true";
  var options = {
    host: "maps.googleapis.com",
    path: path
  };
  http.get(options, function(resp){
    var responseBody = "";
    resp.on('data', function(chunk){
      responseBody += chunk;
    });
    resp.on('end', function() {
      var locationData = JSON.parse(responseBody);
      res.send(locationData);
    });
  }).on("error", function(e){
    console.log("Got error: " + e.message);
  });
};
