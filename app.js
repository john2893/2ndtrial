const express = require('express');
const app = express();

//import Route
const yelpRoute = require('./routes/yelp');


//Middleware
app.use(express.static('/public'));
app.use(express.urlencoded({ extended: true }))


// Middleware Route
app.use('/', yelpRoute)


//view engine
app.set('view engine', 'ejs');


app.listen(5000, ()=>
 console.log("This is listening  on Port - 5000"))