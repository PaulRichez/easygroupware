'use strict';

/**
 * new router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::new.new', {
    config: {
        create: {
            roles: ["authenticated"],
            middlewares: [
                (ctx, next) => {
                    const data = JSON.parse(ctx.request.body.data)
                    if (!data.author || data.author.toString() !== ctx.state.user.id.toString()) {
                        return ctx.badRequest(`Field author error`);
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
