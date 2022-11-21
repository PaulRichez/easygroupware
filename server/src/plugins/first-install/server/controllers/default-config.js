'use strict';

/**
 * default-config controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('plugin::first-install.default-config');
