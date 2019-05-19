require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const moment = require("moment")
const fs = require("fs");
const axios = require("axios")

var spotify = new Spotify(keys.spotify);
var search = process.argv[2];
var term = process.argv.slice(3).join(" ");

if (search === "concert-this") {
    findConcert()
}

if (search === "spotify-this-song" && !term) {
    term = "The Sign"
    findSong()
} 

if (search === "spotify-this-song") {
    findSong()
} 

if (search === "movie-this"){
    findMovie();
}

if (search === "do-what-it-says") {
    doIt();
}

function findConcert() {
    var URL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp"
    axios.get(URL).then(function(response){
        var showData = [
            "Venue: " + response.data[0].venue.name,
            "Location: " + response.data[0].venue.city,
            "Date of Event: " + moment(response.data[0].datetime).format("MM/DD/YYYY")
        ].join('\n')
        fs.appendFile("log.txt", showData, function (err) {
            if (err) throw (err);
            console.log(showData);
    })
    })
}

function findSong(term) {
    spotify
    .search({type: "track", query:term})
    .then(function(response){
        var showData = [
            //artists
            "Artist(s) " + response.tracks.items[0].artists[0].name,
            //songName
             "Song's Name: " + response.tracks.items[0].name,
            //preview link
             "Preview's Link: " + response.tracks.items[0].preview_url,
            //album song from
             "Album's song from: " + response.tracks.items[0].album.name
         ].join("\n");
         fs.appendFile("log.txt", showData, function (err) {
             if (err) throw (err);
             console.log(showData);
     })
        
    })

}

function findMovie () {
    var URL = "https://www.omdbapi.com/?t=" + term + "&apikey=trilogy"

        axios.get(URL).then(function (response) {
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
            fs.appendFile("log.txt", showData, function (err) {
                if (err) throw (err);
                console.log(showData);
        })
        })
}

function doIt() {
    fs.readFile("random.txt","utf8", function(error, data){
        if (error) {
            return console.log(error)
        }
        
        var dataArr = data.split(",");

        dataArr[0] = process.argv[2]
        findSong(dataArr[1]);
        
    })
}
