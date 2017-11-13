 /**
 * @file pizzaController.js
 * @desc Handle pizza routes in order to create, read, update, delete pizzas from APP<br />
 * Date de Création : 20/10/2017 <br />
 * Date de modification :13/11/2017 <br />
 * 
 * @version 1.0
 * 
 * @author Valerian pyckaert           <valerian.pyckaert@ynov.com>
 * 
 */

'use strict';
 
// Models
const pizzaSchema = require('../Model/pizzaSchema');
const ingredientSchema = require('../Model/ingredientSchema');

// Modules
const express = require('express');
const router = express.Router();
const path = require('path');
const ServerEvent = require('./ServerEvent');

/**
 * PIZZA ROUTES
 */
 
router.get('/', (req,res,next) => {
    getPizzas(req,res,next);
}); 

router.get('/:pizza_id', (req,res,next) => {
    getPizzaFromId(req,res,next);
}); 

router.get('/name/:name', (req,res,next) => {
    getPizzaFromName(req,res,next);
}); 

router.get('/price/:price', (req,res,next) => {
    getPizzaFromPrice(req,res,next);
}); 

router.get('/update/update_at', (req,res,next) => {
    getPizzaFromUpdateDate(req,res,next);
}); 

router.get('/ingredient/:ingredient_id', (req,res,next) => {
    getPizzaFromIngredient(req,res,next);
}); 

router.post('/', (req,res,next) => {
    create(req,res,next);
}); 

router.put('/:pizza_id', (req,res,next) => {
    update(req,res,next);
});

router.delete('/:pizza_id', (req,res,next) => {
    deletePizza(req,res,next);
});


/**
 * GET METHODS
 */
 
/**
 * Get all pizzas in APP
 * @function
 * @param {Object} req : Express request
 * @param {Object} res : Express response
 * @param {Object} next : Express next
 */
function getPizzas(req,res,next){
    pizzaSchema.find({})
    .populate('ingredient_ids')
    .exec((err, docs) => {
        if (err) {
          console.error(err);
          res.status(500);
          res.json({ message: err });
        }
        else {
          res.status(200).json(docs);
        }
      });
}

/**
 * Get a pizza from its id
 * @function
 * @param {Object} req : Express request
 * @param {Object} res : Express response
 * @param {Object} next : Express next
 */
function getPizzaFromId(req,res,next){
    pizzaSchema.find({ _id: req.params.pizza_id })
    .populate('ingredient_ids')
    .exec((err, docs) => {
        if (err) {
          console.error(err);
          res.status(500);
          res.json({ message: err });
        }
        else {
          res.status(200).json(docs);
        }
      });
}

/**
 * Get a pizza from its name
 * @function
 * @param {Object} req : Express request
 * @param {Object} res : Express response
 * @param {Object} next : Express next
 */
function getPizzaFromName(req,res,next){
    pizzaSchema.find({ name: req.params.name })
    .populate('ingredient_ids')
    .exec((err, docs) => {
        if (err) {
          console.error(err);
          res.status(500);
          res.json({ message: err });
        }
        else {
          res.status(200).json(docs);
        }
      });
}

/**
 * Get a pizza from its price
 * @function
 * @param {Object} req : Express request
 * @param {Object} res : Express response
 * @param {Object} next : Express next
 */
function getPizzaFromPrice(req,res,next){
    pizzaSchema.find({ price: req.params.price })
    .populate('ingredient_ids')
    .exec((err, docs) => {
        if (err) {
          console.error(err);
          res.status(500);
          res.json({ message: err });
        }
        else {
          res.status(200).json(docs);
        }
      });
}


/**
 * Get a pizza from its update date
 * @function
 * @param {Object} req : Express request
 * @param {Object} res : Express response
 * @param {Object} next : Express next
 */
function getPizzaFromUpdateDate(req,res,next){
    pizzaSchema.find({ updated_at: req.params.updated_at })
    .populate('ingredient_ids')
    .exec((err, docs) => {
        if (err) {
          console.error(err);
          res.status(500);
          res.json({ message: err });
        }
        else {
          res.status(200).json(docs);
        }
      });
}


/**
 * Get all pizzas from its ingredient
 * @function
 * @param {Object} req : Express request
 * @param {Object} res : Express response
 * @param {Object} next : Express next
 */
function getPizzaFromIngredient(req,res,next){
    pizzaSchema.find({ ingredient_id: req.params.ingredient_id })
    .populate('ingredient_ids')
    .exec((err, docs) => {
        if (err) {
          console.error(err);
          res.status(500);
          res.json({ message: err });
        }
        else {
          res.status(200).json(docs);
        }
      });
}

/**
 * CREATE, UPDATE, DELETE METHODS
 */
 
 
/**
 * Create a new pizza in APP
 * @function
 * @param {Object} req : Express request
 * @param {Object} res : Express response
 * @param {Object} next : Express next
 */
function create(req,res,next){
    //The pizza that will be created
    let pizza = new pizzaSchema(req.body);
    
    pizza.save((err, pizza) => {
        if(err){
            console.error(err);
            res.status(500);
            res.send(err);
        }else{
            res.status(200);                    
            res.send(pizza);
        }
        next();  
    });
}


/**
 * Update the pizza given in parameters
 * @function
 * @param {Object} req : Express request
 * @param {Object} res : Express response
 * @param {Object} next : Express next
 */
function update(req,res,next){
    pizzaSchema.findById({_id: req.params.pizza_id}), (err, pizza) => {
        if(err){
            res.send(err)
        }else{
            Object.assign(pizza, req.body).save((err, pizza) => {
                if(err){
                    console.error(err);
                    res.status(500);
                    res.send(err);
                }else{
                    res.status(200);                    
                    res.send(pizza);
                }
                next();  
            });    
        }
    }
}


/**
 * Delete the pizza given in parameters
 * @function
 * @param {Object} req : Express request
 * @param {Object} res : Express response
 * @param {Object} next : Express next
 */
function deletePizza(req,res,next){
    pizzaSchema.remove({_id: req.params.pizza_id}, (err, pizza) => {
        if(err){
            res.status(500);
            res.send(err);
        }else{
            res.status(200);                    
            res.send(pizza);
        }
        next();  
    });    
}
 
// Export
module.exports = router