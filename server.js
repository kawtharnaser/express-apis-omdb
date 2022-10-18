require('dotenv').config();
const { response } = require('express');
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();

// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);

// Adds some logging to each request
app.use(require('morgan')('dev'));


let axios = require('axios');

// Routes

//home route
app.get('/', function(req, res) {
  console.log(process.env.OMDb_API_KEY)
  res.render('index')
});

//results route
app.get('/results', (req, res)=>{
  let s = req.body.s
  console.log(s)
  // axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDb_API_KEY}&s=${s}`)
  axios.get(`http://www.omdbapi.com/?s=${s}=Star+Wars&apikey=${process.env.OMDb_API_KEY}`)

  .then(function (response){
    res.render('results', {data: response.data.Search})
  })
})



// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
