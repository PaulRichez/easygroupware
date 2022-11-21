// path: ./src/api/hello/controllers/hello.js

module.exports = {
    async find(ctx, next) {
        const result = await strapi.service('plugin::emailengine.mailbox').find(ctx.state.user.id, ctx.request.query);
        ctx.status = result?.status || result?.statusCode || 200;
        ctx.body = result
    },
    async create(ctx, next) {
        const result = await strapi.service('plugin::emailengine.mailbox').create(ctx.state.user.id, ctx.request.body.data.paths);
        ctx.status = result?.status || result?.statusCode || 200;
        ctx.body = result
    },
    async delete(ctx, next) {
        const result = await strapi.service('plugin::emailengine.mailbox').create(ctx.state.user.id, ctx.request.query.path);
        ctx.status = result?.status || result?.statusCode || 200;
        ctx.body = result
    }
};
