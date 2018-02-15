require("dotenv").config();

var keys = require("./keys.js");

var apikeys = require("./keys.js")

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request'); //OMDB


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


switch(process.argv[2]){
	case "movie-this":
		//default: "Mr. Nobody";
		renderMovie();
		break;
	case "spotify-this-song":
		renderSpotify();
		break;
	case "my-tweets":
		renderTweets();
		break;
	case "do-what-it-says":
		//renderWhatISay();
		break;
}


function renderMovie(){
	
	var movieName = "";
	//var nobody = process.argv[3];
	if(typeof nobody === "undefined"){
		var movieName = "Mr. Nobody";
	}else{

		for(var i = 3; i < process.argv.length; i++){

			if(i > 3 && i < process.argv.length){

				var movieName = movieName + "+" + process.argv[i];
			}else{
				var movieName = process.argv[3];
			}
		};
	};

	// Then run a request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

	request(queryUrl, function(error, response, body){
		if (!error && response.statusCode === 200) {
			//console.log(JSON.parse(body));
			console.log("Title: " + JSON.parse(body).Title);
			console.log("Year: " + JSON.parse(body).Year);
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			console.log("Rotten Tomato Rating: " + JSON.parse(body).Ratings[1].Value);
			console.log("Country Produced: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);
			console.log("-----------------")
		}
	});
};


function renderTweets(){
 	var params = {screen_name: 'Kovacic55'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	   if (!error) {
	     //console.log(tweets);
	     //console.log(response);
		for(var i = 0; i < tweets.length; i++){
		     console.log(tweets[i].text)
		 };
		 console.log("--------------------------------------------------------------------")
	   };
	 });
};

function renderSpotify(){
	var song = "";
	var search = process.argv[3];

	if(typeof search === "undefined"){
		var song = "The Sign, Ace of Base"
	}else{

		for(var i = 3; i < process.argv.length; i++){
			
			if(i > 3 && i < process.argv.length){

				var song = song + "+" + process.argv[i];
			}else{
				var song = process.argv[3];
			}
		};
	};


	spotify.search({ type: 'track', query: song, limit: 10}, function(err, data) {
	 	if (err) {
	    return console.log('Error occurred: ' + err);
		}
	 
	//console.log(JSON.parse(data));
	//console.log(data.tracks.items[0]);
		for(var i = 0; i < 10; i++){

		console.log("Artist: " + data.tracks.items[i].artists[0].name);
		console.log("Song Name: " + data.tracks.items[i].name);
		console.log("Preview Link: " + data.tracks.items[i].preview_url);
		console.log("Album Title: " + data.tracks.items[i].album.name);
		console.log("--------------------------")

		}
	});
}






