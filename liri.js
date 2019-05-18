require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const moment = require("moment")
const fs = require("fs");
const axios = require("axios")



var spotify = new Spotify(keys.spotify);

var search = process.argv[2];

var term = process.argv.slice(3).join(" ");

var liri = new Liri();

if (!search) {
    console.log("Please enter: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")
}

if (!term) {
    console.log("Please enter a search parameter")
}

if (search === "concert-this") {
    console.log("Searching for concert");
    liri.findConcert(term);
}

if (search === "spotify-this-song") {
    console.log("Searching for song");
    liri.findSong(term);
}
if (search === "spotify-this-song" && !term) {
    term = "The Sign";
    liri.findSong(term);
}

if (search === "movie-this") {
    console.log("Searching for movie");
    liri.findMovie(term);
}

if (search === "movie-this" && !term) {
    term = "My.Nobody";
    liri.findMovie(term);
}

if (search === "do-what-it-says") {
    console.log("Searching for last command");
    liri.doIt();
}

var Liri = function () {

    this.findConcert = function (artist) {
        var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

        axios.get(URL).then(function (response) {

            var divider = "\n-------------------------------------------------\n";
            var Data = response.data;
            var showData = [
                //name of the venue
                "Venue: " + Data.venue.name,
                //venue location
                "Venue Location: " + Data.venue.city + ", " + data.venue.region,
                //data of event in moment.js
                "Date of Event: " + moment(Data.datetime, 'MM/DD/YYYY')
            ].join("\n");

            fs.appendFile("log.txt", showData + divider, function (err) {
                if (err) throw (err);
                console.log(showData);
            })
        });
    }

    this.findSong = function (song) {
        spotify
        .search({type: "track", query:song})
        .then(function(response){
            console.log(response);
        })
        .catch(function(err){
            if (err) throw (err);
            console.log(err);

        })


    }

    this.findMovie = function (movie) {
        var URL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy"

        axios.get(URL).then(function (response) {

            var divider = "\n-------------------------------------------------\n";
            var Data = response.data;
            var showData = [
                //title of movie
                "Title: " + Data.Title,
                //year release
                "Year Release: " + Data.Year,
                //imdb rating
                "Imdb rating: " + Data.Ratings[0].Value,
                //rotten rating
                "Rotten Tomatoes rating: " + Data.Ratings[1].Value,
                //country produced in
                "Country Produced in: " + Data.Country,
                //lang movie
                "Language: " + Data.Language,
                //plot of movie
                "Plot: " + Data.Plot,
                //actors in movie
                "Actors: " + Data.Actors
            ].join("\n");

            fs.appendFile("log.txt", showData + divider, function (err) {
                if (err) throw (err);
                console.log(showData);
            })
        });
    }

    this.doIt = function () {
        fs.readFile("random.txt","utf8", function(error, data){
            if (error) {
                return console.log(error)
            }
            
            var dataArr = data.split(",");

            findSong(dataArr[0]);
            console.log(dataArr[1]);
        })
    }

};