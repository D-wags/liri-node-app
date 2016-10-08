
// get node modules
var request = require('request');
var twitter = require('twitter');
var spotify = require('spotify');
var twKeys = require('./key.js');
var fs = require("fs");

// fs.appendFile('message.txt', 'data to append', function (err) {

// });


// fucntion writes output argument to external file
function logOutput(output) {
  fs.appendFile("log.txt", output, function(err, data){
        if (err) {
          console.log(err);
        }
    });

}

// function pulls song info regarding the argument song 
// default song is Miss World by Hole
function getSong(song) {
  if (song == undefined) {
    song = "Miss World";
  }

  spotify.search({ type: 'track', query: song }, function(err, data) {
    if ( err ) {
          console.log('Error occurred: ' + err);     
      }
   	else {
      console.log("\n ----------------------------------------------- \n");
      console.log("Song name: " + data.tracks.items[0].name);
      console.log("Artist name: " + data.tracks.items[0].artists[0].name);
      console.log("Album title: " + data.tracks.items[0].album.name);
      console.log("Audio preview: " + data.tracks.items[0].preview_url);
      console.log("\n ----------------------------------------------- \n");

      logOutput("\n ----------------------------------------------- \n");
      logOutput("Song name: " + data.tracks.items[0].name  + "\n");
      logOutput("Artist name: " + data.tracks.items[0].artists[0].name + "\n");
      logOutput("Album title: " + data.tracks.items[0].album.name) + "\n";
      logOutput("Audio preview: " + data.tracks.items[0].preview_url + "\n");
      logOutput("\n ----------------------------------------------- \n");
      
      
   	  }
      
  });
}


//fucntion calls twitter and displays my last 20 tweets
function callTwitter() {

  var client = new twitter({
    consumer_key: twKeys.twitterKeys.consumer_key,
    consumer_secret: twKeys.twitterKeys.consumer_secret,
    access_token_key: twKeys.twitterKeys.access_token_key,
    access_token_secret: twKeys.twitterKeys.access_token_secret
  });

  var params = {BigD_inda_City: 'nodejs'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log("\n ----------------------------------------------- \n");
      console.log("Last 20 tweets below:");

      logOutput("\n ----------------------------------------------- \n");
      logOutput( "Last 20 tweets below:"  + "\n");

      var tweet_length = tweets.length;

      if (tweet_length > 20) {
        tweet_length = 20;
      }

      for (var i = 0; i < tweets.length; i++) {
        logOutput(tweets[i].text  + "\n");
      	console.log(tweets[i].text);
        
      }
      logOutput("\n ----------------------------------------------- \n");
      console.log("\n ----------------------------------------------- \n");
    }
    else {
    	console.log(error);
    }
  });
}


// function retrieves info for given movie from omdb API
function getMovie(movie) {
     var req1 = 'http://www.omdbapi.com/?t=';
     var req2 = '&y=&plot=short&r=json';

     request(req1 + movie + req2, function (error, response, body) {

    	if (!error && response.statusCode == 200) {

        console.log("\n ----------------------------------------------- \n");
    		console.log("The movie's rating is: " + JSON.parse(body)["imdbRating"]);
    		console.log("The movie's tite is: " + JSON.parse(body)["Title"]);
    		console.log("The movie's year is: " + JSON.parse(body)["Year"]);
    		console.log("The movie's language is: " + JSON.parse(body)["Language"]);
    		console.log("The movie's plot is: " + JSON.parse(body)["Plot"]);
    		console.log("The movie's  actors are: " + JSON.parse(body)["Actors"]);
    		console.log("The movie's country is: " + JSON.parse(body)["Country"]);
        console.log("\n ----------------------------------------------- \n");

        logOutput("\n ----------------------------------------------- \n");
        logOutput("The movie's rating is: " + JSON.parse(body)["imdbRating"] + "\n");
        logOutput("The movie's tite is: " + JSON.parse(body)["Title"] + "\n");
        logOutput("The movie's year is: " + JSON.parse(body)["Year"] + "\n");
        logOutput("The movie's language is: " + JSON.parse(body)["Language"] + "\n");
        logOutput("The movie's plot is: " + JSON.parse(body)["Plot"] + "\n");
        logOutput("The movie's  actors are: " + JSON.parse(body)["Actors"] + "\n");
        logOutput("The movie's country is: " + JSON.parse(body)["Country"] + "\n");
        logOutput("\n ----------------------------------------------- \n");

    	}

  	else {
  		console.log(error);
  	}
  });
 }



// switch statement to process user input
 switch (process.argv[2]) {

  case "movie-this":
      if(process.argv[3] == undefined) {
        getMovie('Mr. Nobody.');
        break;
     }
     else {
        getMovie(process.argv[3]);
        break;
     }

  case "spotify-this-song":
      getSong(process.argv[3]);
      break;

  case "my-tweets":
      callTwitter(process.argv[3]);
      break;

  case "do-what-it-says":
      fs.readFile("random.txt", "utf8", function(err, data){
        if(err) {
          console.log(err);
        }
        else {
          data = data.split(",");
          getSong(data[1]);
        }
      });
      break;

  default:
    console.log("invalid input");
    break;

 }
 









