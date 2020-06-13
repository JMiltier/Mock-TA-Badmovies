var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var axios = require('axios');
var app = express();
const { API_KEY } = require('../config.js');


// Sign up and get your moviedb API key here:
// https://www.themoviedb.org/account/signup


//Helpers
var apiHelpers = require('./helpers/apiHelpers.js');

//Middleware
app.use(bodyParser.json());
app.use(express.json());
// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + '/../client/dist'));


//OPTION 1: Use regular routes

app.get('/genres', function(req, res) {
  // make an axios request to get the official list of genres from themoviedb
  // use this endpoint. you will need your API key from signup: https://api.themoviedb.org/3/genre/movie/list
  // send back
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
  }

  axios(options)
    .then(data => res.status(200).json(data.data.genres))
    .catch(err => console.error('error getting genres', err.message));

});

app.get('/search', function(req, res) {
  // use this endpoint to search for movies by genres (using API key): https://api.themoviedb.org/3/discover/movie
  // and sort them by votes (worst first) using the search parameters in themoviedb API
  const genreId = req;
  // console.log(genreId)

  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_average.asc&include_adult=false&include_video=false&page=1&vote_count.gte=100&with_genres=28`
  }

  axios(options)
    .then(results => res.status(200).send(results.data.results))
    .catch(err => console.error('error getting genres', err.message));
});


app.post('/save', function(req, res) {

  //save movie as favorite

});

app.post('/delete', function(req, res) {

  //remove movie from favorites

});

/******** Going with option 1 *******
//OPTION 2: Use Express Router

//IF you decide to go with this option, delete OPTION 1 to continue

//Routes

const movieRoutes = require('./routes/movieRoutes.js');

//Use routes
app.use('/movies', movieRoutes);
*************************************/

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
