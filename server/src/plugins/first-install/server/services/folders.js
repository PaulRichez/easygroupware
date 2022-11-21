module.exports = ({ strapi }) => ({
    async createFolderIfDoesNotExist(name) {
        const folder = await strapi.db.query('plugin::upload.folder').findOne({
            where: { name, parent: null }
        });
        if (!folder) {
            return await strapi.plugins.upload.services.folder.create({ name })
        } else {
            return folder;
        }
    }
})