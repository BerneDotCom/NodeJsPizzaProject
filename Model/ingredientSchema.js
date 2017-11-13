 /**
 * @file ingredientSchema.js
 * @desc Schema for ingredients <br />
 * Date de Création : 20/10/2017 <br />
 * Date de modification :13/11/2017 <br />
 * 
 * @version 1.0
 * 
 * @author Valerian pyckaert           <valerian.pyckaert@ynov.com>
 * 
 */
'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Pizza = require('./pizzaSchema');

const IngredientSchema = new Schema({
    name      : { type: String, uniq: true, required: true },
    weight    : { type: String, required: true },
    price     : { type: Number, required: true },
    pizza_ids : [{ type: Schema.Types.ObjectId, ref: 'Pizza'}],
    create_at : { type: Date },
    update_at : { type: Date },
});


IngredientSchema.pre('findOneAndUpdate', function (next) {
  this._update.update_at = Date.now();
  next();
});


/**
 * @desc Insert pizzas id in the ingredien
 */ 
IngredientSchema.pre('save', function(next) {
  this.update_at = Date.now();
  if (this.isNew) {
    this.create_at = this.update_at;
  }
  mongoose.model('Pizza')//Get pizza model
  .update({ _id: { $in: this.pizza_ids }},//Get the specific id mention when we save 
  { $push: { ingredient_ids: this._id }},// Push the ingredient id in the pizza document
  { multi: true })// The register can be multiple 
  .exec();
  next();
});

module.exports = mongoose.model('Ingredient', IngredientSchema);
