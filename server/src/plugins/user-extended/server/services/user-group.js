'use strict';

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('plugin::user-extended.user-group');