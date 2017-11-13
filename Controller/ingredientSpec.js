/**
 * @file ingredientSpec.js
 * @desc Unit test for ingredientController<br />
 * Date de Création : 20/10/2017 <br />
 * Date de modification :13/11/2017 <br />
 * 
 * @version 1.0
 * 
 * @author Valerian pyckaert           <valerian.pyckaert@ynov.com>
 * 
 */

'use strict';
const server = require('../server'),
        ingredientSchema = require('../Model/ingredientSchema'),
        mongoose = require('mongoose'),
        mocha = require('mocha'),
        chai = require('chai'),
        http = require('chai-http');
        
chai.use(http);

let should = chai.should();


describe('Test ingredient getting routes', (done) => {
    it('Should get all ingredients in the app', (done) => {
        chai.request(server).get('/ingredient').end((err, res) => {
            err => console.log(err),
            res => {
                res.should.have.status(200);
                
                res.should.be.a('array');
            }
 
        });
        done();
    });
    
    
    //_id = 5a096ed4a5326658f079c8f2 - Jambon
    it('Should be an object', (done) => {
        chai.request(server).get('/ingredient/5a096ed4a5326658f079c8f2').end((err, res) => {
           
            err => console.log(err),
            
            res => res.should.be.a('Object');
            

        });
        done(); 
    });
    
    
    //_id = 5a096ed4a5326658f079c8f2 - Jambon
    it('Should be a Pizza object filled with all properties', (done) => {
        chai.request(server).get('/ingredient/5a096ed4a5326658f079c8f2').end((err, res) => {
            err => console.log(err),
            res => {
                
                //Test all properties of PizzaSchema
                res.should.have.property('_id');
                res.should.have.property('name');
                res.should.have.property('weight');
                res.should.have.property('price');
                res.should.have.property('pizza_ids');
                res.should.have.property('create_at');
                res.should.have.property('update_at');
                
            }

        });
        done(); 
    });
});


describe('Test ingredient Create, update, delete routes', (done) => {
    
    it('Should post the ingredient given', (done) => {
        //Object ingredient to test the post request
        let ingredientTest = {name: "Ingredient de test", weight: 100, price: 10, pizza_ids: []};
        
        chai.request(server).post('/ingredient')
            .send(ingredientTest)
            .end((err, res) => {
                err => console.log(err),
                res => {
                    //Test all properties of IngredientSchema
                    res.should.have.property('_id');
                    res.should.have.property('name');
                    res.should.have.property('weight');
                    res.should.have.property('price');
                    res.should.have.property('pizza_ids');
                    res.should.have.property('create_at');
                    res.should.have.property('update_at');
                }
            });
       done();    
    });
    
    
    it('Should update the ingredient given', (done) => {
        
        //Object ingredient to test the post request
        let ingredientTest = new ingredientSchema ({name: "Ingredient de test", weight: 100, price: 10, pizza_ids: []});
        
        ingredientTest.save((err, ingredientTest) => {
            chai.request(server).put('/ingredient'+ ingredientTest._id)
                .send({name: "Ingredient 100% pur test"})
                .end((err, res) => {
                    err => console.log(err),
                    res => {
                    //Test all properties of IngredientSchema
                    res.should.have.property('_id');
                    res.should.have.property('name');
                    res.should.have.property('weight');
                    res.should.have.property('price');
                    res.should.have.property('pizza_ids');
                    res.should.have.property('create_at');
                    res.should.have.property('update_at');
                        
                        //Test the previous update name
                        res.should.have.property('name').eql("Ingredient 100% pur test");
                    }
                });
        });
        
        done();    
    });
    
    
    it('Should delete the ingredient given', (done) => {
        //Object ingredient to test the delete request
        let ingredientTest = new ingredientSchema ({name: "Ingredient de test", weight: 100, price: 10, pizza_ids: []});
        
        ingredientTest.save((err, ingredientTest) => {
            chai.request(server)
                .delete('/ingredient/' + ingredientTest._id)
                .end((err, res) => {
                    err => console.log(err),
                    res => {
                        //Test return code
                        res.should.have.status(200);
                    }
                });
        });
        
        done();    
    });

});
