 /**
 * @file pizzaSpec.js
 * @desc Unit test file for pizzaController<br />
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
        pizzaSchema = require('../Model/pizzaSchema'),
        mongoose = require('mongoose'),
        mocha = require('mocha'),
        chai = require('chai'),
        http = require('chai-http');
        
chai.use(http);

let should = chai.should();


describe('Test pizza getting routes', (done) => {
    it('Should get all pizzas in the app', (done) => {
        chai.request(server).get('/pizza').end((err, res) => {
            err => console.log(err),
            res => {
                res.should.have.status(200);
                
                res.should.be.a('array');
            }
        });
        done(); 
    });
    
    
    //_id = 5a096e7ea5326658f079c8f1 - Pizza royale
    it('Should be an object', (done) => {
        chai.request(server).get('/pizza/5a096e7ea5326658f079c8f1').end((err, res) => {
           
            err => console.log(err),
            
            res => res.should.be.a('Object');
            
        });
        done(); 
    });
    
    
    //_id = 5a096e7ea5326658f079c8f1 - Pizza royale
    it('Should be a Pizza object filled with all properties', (done) => {
        chai.request(server).get('/pizza/5a096e7ea5326658f079c8f1').end((err, res) => {
            err => console.log(err),
            res => {
                
                //Test all properties of PizzaSchema
                res.should.have.property('_id');
                res.should.have.property('name');
                res.should.have.property('desc');
                res.should.have.property('picture');
                res.should.have.property('price');
                res.should.have.property('ingredient_ids');
                res.should.have.property('create_at');
                res.should.have.property('update_at');
                
            }

        });
        done(); 
    });
});

describe('Test pizza Create, update, delete routes', (done) => {
    
    it('Should post a the pizza given', (done) => {
        //Object pizza to test the post request
        let pizzaTest = {name: "Pizza de test", desc: "Une belle pizza de test", price: 10, picture: " ", ingredient_ids: []};
        
        chai.request(server).post('/pizza')
            .send(pizzaTest)
            .end((err, res) => {
                err => console.log(err),
                res => {
                    //Test all properties of PizzaSchema
                    res.should.have.property('_id');
                    res.should.have.property('name');
                    res.should.have.property('desc');
                    res.should.have.property('picture');
                    res.should.have.property('price');
                    res.should.have.property('ingredient_ids');
                    res.should.have.property('create_at');
                    res.should.have.property('update_at');
                }
            });
       done();    
    });
    
    
    it('Should update the pizza given', (done) => {
        //Object pizza to test the post request
        let pizzaTest = new pizzaSchema ({name: "Pizza de test", desc: "Une belle pizza de test", price: 10, picture: " ", ingredient_ids: []});
        
        pizzaTest.save((err, pizzaTest) => {
            chai.request(server).put('/pizza'+ pizzaTest._id)
                .send({name: "Pizza de test magnifiquement fonctionnelle"})
                .end((err, res) => {
                    err => console.log(err),
                    res => {
                        //Test all properties of PizzaSchema
                        res.should.have.property('_id');
                        res.should.have.property('name');
                        res.should.have.property('desc');
                        res.should.have.property('picture');
                        res.should.have.property('price');
                        res.should.have.property('ingredient_ids');
                        res.should.have.property('create_at');
                        res.should.have.property('update_at');
                        
                        //Test the previous update name
                        res.should.have.property('name').eql("Pizza de test magnifiquement fonctionnelle");
                    }
                });
        });
        
        done();    
    });
    
    
    it('Should delete the pizza given', (done) => {
        //Object pizza to test the delete request
        let pizzaTest = new pizzaSchema ({name: "Pizza de test", desc: "Une belle pizza de test", price: 10, picture: " ", ingredient_ids: []});
        
        pizzaTest.save((err, pizzaTest) => {
            chai.request(server)
                .delete('/pizza/' + pizzaTest._id)
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
