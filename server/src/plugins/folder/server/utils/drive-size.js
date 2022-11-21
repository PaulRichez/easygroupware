module.exports = {
    getSizeFolder: async function getSizeFolder(strapi, idFolder) {
        let size = 0;
        const folder = await strapi.entityService.findOne('plugin::upload.folder', idFolder, { populate: ['children', 'files'] });
        for (const file of folder.files) {
            size += file.size
        }

        for (const child of folder.children) {
            size += await getSizeFolder(strapi, child.id)
        }
        return size;
    },
}
