 /**
 * @file ingredientController.js
 * @desc Handle ingredients routes in order to create, read, update, delete ingredient from APP<br />
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
const ingredientSchema = require('../Model/ingredientSchema');

// Modules
const express = require('express');
const router = express.Router();
const path = require('path');
const ServerEvent = require('./ServerEvent');

/**
 * INGREDIENT ROUTES
 */
 
router.get('/', (req,res,next) => {
    getIngredients(req,res,next);
});

router.get('/:id', (req,res,next) => {
    getIngrediensFromId(req,res,next);
});

router.get('/price/:price', (req,res,next) => {
    getIngrediensFromPrice(req,res,next);
});


router.get('/pizzaId/:pizzaId', (req,res,next) => {
    getIngrediensFromPizzaId(req,res,next);
});
 
router.post('/', (req,res,next) => {
    create(req,res,next);
});

 
router.put('/:ingredient_id', (req,res,next) => {
    update(req,res,next);
});

 
router.delete('/:ingredient_id', (req,res,next) => {
    deleteIngredient(req,res,next);
});

/**
 * GET METHODS
 */
 
/**
 * Get all ingredients in APP
 * @function
 * @param {Object} req : Express request
 * @param {Object} res : Express response
 * @param {Object} next : Express next
 */
function getIngredients(req,res,next){
    ingredientSchema.find({})
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
 * Get an ingredient from its id
 * @function
 * @param {Object} req : Express request
 * @param {Object} res : Express response
 * @param {Object} next : Express next
 */
function getIngrediensFromId(req,res,next){
    ingredientSchema.findOne({_id : req.params.ingredient_id})
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
 * Get an ingredient from its price
 * @function
 * @param {Object} req : Express request
 * @param {Object} res : Express response
 * @param {Object} next : Express next
 */
function getIngrediensFromPrice(req,res,next){
    ingredientSchema.findOne({price : req.params.price})
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
 * Get all ingredients from pizzaId
 * @function
 * @param {Object} req : Express request
 * @param {Object} res : Express response
 * @param {Object} next : Express next
 */
function getIngrediensFromPizzaId(req,res,next){
    ingredientSchema.findOne({pizza_ids : req.params.pizzaId})
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
* Create, Update, delete METHODS
*/


/**
 * Create a new ingredient in APP
 * @function
 * @param {Object} req : Express request
 * @param {Object} res : Express response
 * @param {Object} next : Express next
 */
function create(req,res,next){
    //The ingredient that will be created
    let ingredient = new ingredientSchema(req.body);
    
    ingredient.save((err, newIngredient) => {
        if(err){
            console.error(err);
            res.status(500);
            res.send(err);
        }else{
            res.status(200);                    
            res.send(newIngredient);
        }
        next();  
    });
}


/**
 * Update the ingredient given in parameters
 * @function
 * @param {Object} req : Express request
 * @param {Object} res : Express response
 * @param {Object} next : Express next
 */
function update(req,res,next){
    ingredientSchema.findById({_id: req.params.ingredient_id}), (err, ingredient) => {
        if(err){
            res.send(err)
        }else{
            Object.assign(ingredient, req.body).save((err, ingredient) => {
                if(err){
                    console.error(err);
                    res.status(500);
                    res.send(err);
                }else{
                    res.status(200);                    
                    res.send(ingredient);
                }
                next();  
            });    
        }
    }
}


/**
 * Delete the ingredient given in parameters
 * @function
 * @param {Object} req : Express request
 * @param {Object} res : Express response
 * @param {Object} next : Express next
 */
function deleteIngredient(req,res,next){
    ingredientSchema.remove({_id: req.params.ingredient_id}, (err, ingredient) => {
        if(err){
            res.status(500);
            res.send(err);
        }else{
            res.status(200);                    
            res.send(ingredient);
        }
        next();  
    });    
}

// Export
module.exports = router