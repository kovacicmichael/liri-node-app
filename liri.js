require("dotenv").config();

var apikeys = require("./keys.js")

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request'); //OMDB


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }

  
});