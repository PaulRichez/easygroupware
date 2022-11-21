'use strict';

/**
 * default-config service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('plugin::first-install.default-config');
