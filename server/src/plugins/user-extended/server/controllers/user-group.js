'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('plugin::user-extended.user-group', ({ strapi }) => ({
    async count(ctx) {
        ctx.body = await strapi.db.query('plugin::user-extended.user-group').count();
    }
}));
