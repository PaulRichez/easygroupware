// path: ./src/api/hello/controllers/hello.js

module.exports = {
    async findMe(ctx, next) {
        const result = await strapi.service('plugin::emailengine.accounts').findOne(ctx.state.user.id);
        ctx.status = result?.status || result?.statusCode || 200;
        ctx.body = result
    },
    async createOrUpdate(ctx, next) {
        const connectedUser = await strapi.entityService.findOne(
            'plugin::users-permissions.user',
            ctx.state.user.id,
        );
        const password = ctx.request.body.data.password;
        const accountExist = await strapi.service('plugin::emailengine.accounts').findOne(ctx.state.user.id);
        if (accountExist.statusCode == 404) {
            //create account
            const result = await strapi.service('plugin::emailengine.accounts').create(ctx.state.user.id, connectedUser.email, password);
            ctx.status = result?.status || result?.statusCode || 200;
            ctx.body = result
        } else {
            //update account
            const result = await strapi.service('plugin::emailengine.accounts').update(ctx.state.user.id, connectedUser.email, password);
            ctx.status = result?.status || result?.statusCode || 200;
            ctx.body = result
        }
    },
    async countAccounts(ctx) {
        const result = await strapi.service('plugin::emailengine.stats').getStats();
        if (result?.accounts) {
            return ctx.body = result.accounts;
        } else {
            return ctx.body = 0;
        }

    }
};
