'use strict';

const assert = require('assert');
const app = require('./Controller/app');

it('should print Hello World', () => {
    assert.strictEqual(app.hey(), 'Hello World');
});