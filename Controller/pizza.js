const router = require('./server');


/**
 * Initialise la liste des pizzas si elle est vide
 * @function
 * @param {function} Request.
 * 
 */
app.use(function(req, res, next){
    // if (typeof(req.session.todolist) == 'undefined') {
    //     req.session.todolist = [];
    // }
    // next();
});

/**
 * Affiche la liste des pizzas et le formulaire de saisie
 * @function
 * @param {function} Request.
 * 
 */
app.get('/', function(req, res) {
        console.log(req.body.pizza);
        // res.render('todo.ejs', {todolist: req.session.todolist});
});

/**
 * Ajoute une pizza
 * @function
 * @param {string} Route.
 * @param {Object} Body parser.
 * @param {function} Request.
 */
app.post('/pizza/add/', urlencodedParser, function(req, res) {
    console.log('Ajout d\' une pizza ');
    // if (req.body.newtodo != '') {
    //     req.session.todolist.push(req.body.newtodo);
    // }
    res.redirect('/');
});

/**
 * Supprime une pizza
 * @function
 * @param {string} Route.
 * @param {function} Request.
 */
app.get('/pizza/delete/:id', function(req, res) {
    console.log('Suppression de la pizza');
    // if (req.params.id != '') {
    //     req.session.todolist.splice(req.params.id, 1);
    // }
    res.redirect('/');
});

