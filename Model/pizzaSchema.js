 /**
 * @file pizzaSchema.js
 * @desc Schema for pizzas <br />
 * Date de Création : 20/10/2017 <br />
 * Date de modification :13/11/2017 <br />
 * 
 * @version 1.0
 * 
 * @author Valerian pyckaert           <valerian.pyckaert@ynov.com>
 * 
 */

'use strict';


/**
 * @requires Schema
 */
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

/**
 * @class PizzaSchema
 * @param {String} name - Pizza name (required)
 * @param {String} desc - Little description of the pizza (required)
 * @param {String} picture - Picture of the pizza as base64Image
 * @param {Array} ingredients - Ingredient list (required)
 * @param {Number} price - Pizza price (required)
 * @param {Date} create_at - Creation date
 * @param {Date} update_at - Last update date
 * @return {Schema}
 */
const pizzaSchema = new Schema({
    name            : { type: String, uniq: true, required: true },
    desc            : { type: String, required: true },
    picture         : { type: String, required: true },
    price           : { type: Number, required: true },
    ingredient_ids  : [{ type: Schema.Types.ObjectId, ref: 'Ingredient', required: true}],
    create_at       : { type: Date },
    update_at       : { type: Date },
});

/**
 * @function preValidate
 * @param {function} next - Call the next middleware
 * @description WIP
 */
pizzaSchema.pre('validate', (next) => {
    console.log("Enregistrement en cours");
  next();
});


/**
 * @function preSave
 * @param {function} next - Express next middleware function
 * @param {Object} err - Message generate when an error occurr
 * @description Save the last update and the creation date if it's a new object
 * Update ingredients when a pizza is updated
 */
pizzaSchema.pre('save', function(next, err) {
    this.update_at = Date.now();
        if (this.isNew) {
            this.create_at = this.update_at;
        }
      // Update all ingredients
      mongoose.model('Ingredient')
      .update({ _id: { $in: this.ingredient_ids }},
      { $push: { pizza_ids: this._id }},
      { multi: true })
      .exec();
  next();
});

module.exports = mongoose.model('Pizza', pizzaSchema);