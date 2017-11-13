 /**
 * @file server.js
 * @desc Web server for app Ynov Pizza. <br />
 * Ynov Pizza allow you to handle pizzas & ingredients <br />
 * <br />
 * Date de Création : 20/10/2017 <br />
 * Date de modification :20/10/2017 <br />
 * 
 * @version 1.0
 * 
 * @author Valerian pyckaert           <valerian.pyckaert@ynov.com>
 * 
 */
 
 
'use strict';

// REQUIRE MODULES
const path       = require('path'),
      express    = require('express'),
      app        = express(),
      http       = require('http').Server(app),
      mongoose   = require('mongoose'),
      bodyParser = require('body-parser'),
      io         = require('socket.io')(http),
      port       = process.env.PORT || 3000;
      
// Db connection
mongoose.connect('mongodb://localhost/pizza', err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});

//Server Event
const ServerEvent = require('./Controller/ServerEvent');

// Socket.io
require('./Controller/socket').listen(http, ServerEvent);

//Controllers
const Pizza = require ('./Controller/pizzaController');
const Ingredient = require ('./Controller/ingredientController');

//Require Model

// General Conf
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//App routers
app.use('/pizza', Pizza); //Pizza routes (get, getBy*, put, post, delete)
app.use('/ingredient', Ingredient); //Ingredient routes (get, getBy*, put, post, delete)

//Web Server listening on 3000
http.listen(port, () =>{ 
    console.log(`Listen on port ${port}`);
});

module.exports = http;