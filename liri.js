require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const moment = require("moment")
const fs = require("fs");



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

if (search === "spotify-this-song" && !term) {
    term = "The Sign"; 
}

if (search === "concert-this") {
    console.log("Searching for concert");
    liri.findConcert(term);
}

if (search === "spotify-this-song") {
    console.log("Searching for song");
    liri.findSong(term);
}

if (search === "movie-this") {
    console.log("Searching for movie");
    liri.findMovie(term);
}

if (search === "do-what-it-says") {
    console.log("");
    liri.doWhatItSays(term);
}

var Liri = function () {

    this.findConcert = function (artist) {
        var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

        axios
            .get(URL)
            .then(function (response) {

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

                fs.appendFile("log.txt", showData + divider, function(err){
                    if (err) throw (err);
                    console.log(showData);
                })
            });
    }

    // this.findSong = function (song) {
    //     spotify
    //     .search({type: "track", query:song})
    //     .then(function(response){
    //         console.log(response);
    //     })
    //     .catch(function(err){
    //         if (err) throw (err);
    //         console.log(err);
            
    //     })


    // }


};