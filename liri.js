require("dotenv").config();

var axios = require("axios");
var moment = require("moment");

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

/* 9. Make it so liri.js can take in one of the following commands:

* `concert-this`

* `spotify-this-song`

* `movie-this`

* `do-what-it-says` */

let arg1 = process.argv[2];
let arg2 = process.argv[3];


function SpotifyThis(quer){
  spotify.search({ type: 'track', query: quer }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
    var res = data.tracks.items[0];
        console.log(
            "Artist: " + res.artists[0].name,
            "\nSong: " + res.name,
            "\nLink to Song: " + res.preview_url,
            "\nAlbum: " + res.album.name
        );
  

  });
}

function ConcertThis(quer) {
  axios.get("https://rest.bandsintown.com/artists/" + quer + "/events?app_id=codingbootcamp").then(function (response) {
      console.log("Venue: " + response.data[0].venue.name)
      console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.country)
      console.log("Date: " + moment(response.data[0].datetime).format("MM-DD-YYYY"))
  }
  )
}

function MovieThis(quer) {
  if (!quer) {
      quer = "The Matrix"
  }
  console.log("Query: " +quer)
  axios.get("http://www.omdbapi.com/?t=" + quer + "&plot=short&apikey=trilogy").then(function (response) {

      // else {
          console.log(
              "Movie Title: " + response.data.Title,
              "\nYear: " + response.data.Year,
              "\nIMDB Rating: " + response.data.imdbRating,
              "\nRotten Tomatoes Rating: " + response.data.Ratings[1],
              "\nCountry: " + response.data.Country,
              "\nLanguage: " + response.data.Language,
              "\nMovie Plot: " + response.data.Plot,
              "\nActors: " + response.data.Actors);
      // }
  })
};

function DoWhatItSays() {

  var fs = require("fs")

  fs.readFile("random.txt", "utf8", function (error, data) {
      if (error) {
          return console.log(error)
      }
      console.log(SpotifyThis(data))

  });
};




  switch (arg1) {
    case "movie-this":
        MovieThis(arg2)
        break;

    case "concert-this":
        ConcertThis(arg2)
        break;

    case "spotify-this-song":
        SpotifyThis(arg2)
        break;

    case "do-what-it-says":
        DoWhatItSays()
        break;
};
  