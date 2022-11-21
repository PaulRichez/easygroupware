'use strict';

/**
 * imap-smtp service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::imap-smtp.imap-smtp');
