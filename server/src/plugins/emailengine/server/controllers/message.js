// path: ./src/api/hello/controllers/hello.js

module.exports = {
    async search(ctx, next) {
        const result = await strapi.service('plugin::emailengine.message').search(ctx.state.user.id, ctx.request.body.data, ctx.request.query);
        ctx.status = result?.status || result?.statusCode || 200;
        ctx.body = result
    },
    async get(ctx, next) {
        const result = await strapi.service('plugin::emailengine.message').get(ctx.state.user.id, ctx.request.params.id, ctx.request.query);
        ctx.status = result?.status || result?.statusCode || 200;
        ctx.body = result
    },
    async update(ctx, next) {
        const result = await strapi.service('plugin::emailengine.message').update(ctx.state.user.id, ctx.request.params.id, ctx.request.body);
        ctx.status = result?.status || result?.statusCode || 200;
        ctx.body = result
    },
    async downloadAttachment(ctx, next) {
        const result = await strapi.service('plugin::emailengine.message').downloadAttachment(ctx.state.user.id, ctx.request.params.id);
        ctx.status = result?.status || result?.statusCode || 200;
        ctx.body = result
    },
    async submit(ctx, next) {
        const result = await strapi.service('plugin::emailengine.message').submit(ctx.state.user.id, ctx.request.body);
        ctx.status = result?.status || result?.statusCode || 200;
        ctx.body = result
    },
    async getMessageSource(ctx, next) {
        const result = await strapi.service('plugin::emailengine.message').getMessageSource(ctx.state.user.id, ctx.request.params.id);
        ctx.status = result?.status || result?.statusCode || 200;
        ctx.body = result
    }
};
