const { getSizeFolder } = require('../utils/drive-size');
const { getFilesInFolderDeep } = require('../utils/folder-files');
module.exports = ({ strapi }) => ({
    async getMyDriveFolderRoot(ctx) {
        let folderDrives = await strapi.db.query('plugin::upload.folder').findOne({
            where: { name: 'drives', parent: null }
        });
        if (!folderDrives) {
            folderDrives = await strapi.plugins.upload.services.folder.create({ name: 'drives' })
        }

        let myDriveFolder = await strapi.db.query('plugin::upload.folder').findOne({
            where: { name: ctx.state.user.id.toString(), parent: folderDrives.id }
        });
        if (!myDriveFolder) {
            myDriveFolder = await strapi.plugins.upload.services.folder.create({ name: ctx.state.user.id.toString(), parent: folderDrives.id, owner: ctx.state.user })
        }

        return myDriveFolder;
    },
    async getMyDriveSize(ctx) {
        const myDriveFolder = await this.getMyDriveFolderRoot(ctx)
        return await getSizeFolder(strapi, myDriveFolder.id)
    },
    async createNewFolder(ctx, name, parentId) {
        const parent = await strapi.db.query('plugin::upload.folder').findOne({
            where: { id: parentId }, populate: ['owner']
        });
        if (parent?.owner?.id !== ctx.state.user.id) {
            return ctx.unauthorized(`Permission denied`);
        }
        return await strapi.plugins.upload.services.folder.create({ name, owner: ctx.state.user, parent: parentId })
    },
    async deleteFolderDeep(idFolder) {
        const files = await getFilesInFolderDeep(strapi, idFolder);
        await strapi.plugins.upload.services.file.deleteByIds(files.map(f => f.id))
        const data = await strapi.plugins.upload.services.folder.deleteByIds([idFolder])
        return data;
    },
    async getAveragedDriveSize() {
        const countUser = await strapi.db.query('plugin::users-permissions.user').count();
        return await this.getTotalDriveSize() / countUser || 0;
    },
    async getTotalDriveSize() {
        let folderDrives = await strapi.db.query('plugin::upload.folder').findOne({
            where: { name: 'drives', parent: null }
        });
        if (!folderDrives) {
            folderDrives = await strapi.plugins.upload.services.folder.create({ name: 'drives' })
        }
        console.log(folderDrives.id)
        return await getSizeFolder(strapi, folderDrives.id)
    }
})