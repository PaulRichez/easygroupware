'use strict';

const myService = require('./my-service');

module.exports = {
  myService,
  'user-group': require('./user-group')
};
