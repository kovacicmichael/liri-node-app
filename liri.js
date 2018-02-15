require("dotenv").config();

var apikeys = require("./keys.js")

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request'); //OMDB


//var spotify = new Spotify(keys.spotify);
//var client = new Twitter(keys.twitter);



switch(process.argv[2]){
	case "movie-this":
		default: "Mr. Nobody";
		renderMovie();
		break;
	case "spotify-this-song":
		//renderSpotify();
		break;
	case "my-tweets":
		//renderTweets();
		break;
	case "do-what-it-says":
		//renderWhatISay();
		break;
}




function renderMovie(){
	
	var movieName = "";

	for(var i = 3; i < process.argv.length; i++){
		// if(process.argv[3] == false){

		// 	var movieName = "Mr. Nobody";
		if(i > 3 && i < process.argv.length){

			var movieName = movieName + "+" + process.argv[i];
		}else{
			var movieName = process.argv[3];
		}
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
		}
	});
	
	
};

// var params = {screen_name: 'nodejs'};
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     console.log(tweets);
//   }

  
// });