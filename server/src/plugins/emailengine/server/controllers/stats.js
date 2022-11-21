module.exports = {
    async get(ctx, next) {
        const result = await strapi.service('plugin::emailengine.stats').getStats();
        return ctx.body = result;
    }
}