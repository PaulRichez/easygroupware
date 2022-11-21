'use strict';

/**
 * imap-smtp router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::imap-smtp.imap-smtp', {
    config: {
        find: {
            roles: ["authenticated", "demo"],
        },
        update: {
            roles: ["authenticated"]
        },
        delete: {
            roles: ["authenticated"]
        }
    }
});
