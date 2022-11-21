'use strict';

/**
 *  router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::calendar.event-source', {
    config: {
        create: {
            roles: ["authenticated"],
            middlewares: [
                (ctx, next) => {
                    const data = JSON.parse(JSON.stringify(ctx.request.body.data))
                    if (!data.owner || data.owner.toString() !== ctx.state.user.id.toString()) {
                        return ctx.badRequest(`Field owner error`);
                    }
                    return next();
                },
            ]
        },
        find: {
            roles: ["authenticated", "demo"],
        },
        findOne: {
            roles: ["authenticated", "demo"]
        },
        update: {
            roles: ["authenticated"]
        },
        delete: {
            roles: ["authenticated"]
        }
    }
});

