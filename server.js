 /**
 * @file server.js
 * @desc Point d'entrée de l'application 'Pizza'. <br />
 * L'application pizza permet de gérer une liste de pizza. <br />
 * <br />
 * Date de Création 20/10/2017 <br />
 * Date de modification 20/10/2017 <br />
 * 
 * @version 1.0.0
 * 
 * @author Valérian Pyckaert <valerian.pyckaert@ynov.com>
 * 
 */


//Initialisation
const 
    express = require('express'),
    bodyParser = require('body-parser'),
    urlencodedParser = bodyParser.urlencoded({ extended: false }),
    app = express(), 
    router = express.Router(),
    path = require('path'),
    mongoose   = require('mongoose'),
    port = process.env.PORT || 3000,
    pizza = require('./Controller/pizza');

// Mongoose connection
mongoose.connect('mongodb://localhost/pozza4ever', err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});


// Configurations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'View')));
app.use(express.static(path.join(__dirname, 'node_modules', 'socket.io-client', 'dist')));


// Conf Routes
app.use('/pizza', pizza.router);

/**
 * Redirection si la route n'existe pas
 * @function
 * @param {function} Request.
 */
app.use(function(req, res, next){
    res.redirect('/pizza');
})

.listen(3000);