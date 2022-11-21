module.exports = {
    getFilesInFolderDeep: async function getFilesInFolderDeep(strapi, idFolder) {
        let files = [];
        const folder = await strapi.entityService.findOne('plugin::upload.folder', idFolder, { populate: ['children', 'files'] });

        for (const file of folder.files) {
            files.push(file)
        }

        for (const child of folder.children) {
            files = files.concat(await getFilesInFolderDeep(strapi, child.id))
        }
        return files;
    },
}
