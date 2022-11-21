'use strict';

const userExtended = require('./user-extended');

module.exports = {
  'user-extended': userExtended,
  'user-group': require('./user-group')
};
