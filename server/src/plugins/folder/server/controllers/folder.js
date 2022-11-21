'use strict';


module.exports = {
    async findOne(ctx, next) {
        let data = await strapi.entityService.findOne(
            'plugin::upload.folder',
            ctx.params.id,
            {
                populate: {
                    'files': { populate: ['owner'] },
                    'parent': { populate: ['parent', 'parent.parent', 'parent.parent.parent'] },
                    'children': {
                        populate: { owner: true, children: { count: true }, files: { count: true } },
                    },
                    'owner': true
                }
            }
        );
        if (!data?.parent?.parent) {
            data.parent = null;
        }
        if (!data?.parent?.parent?.parent && data?.parent?.parent) {
            data.parent.parent = null;
        }
        if (!data?.parent?.parent?.parent?.parent && data?.parent?.parent?.parent) {
            data.parent.parent.parent = null;
        }
        ctx.body = data;
    },
    async createFolder(ctx) {
        const newFolder = await strapi
            .plugin('folder')
            .service('drive')
            .createNewFolder(ctx, ctx.request.body.data.name, ctx.params.id);
        const data = await strapi.entityService.findOne(
            'plugin::upload.folder',
            newFolder.id,
            {
                populate: {
                    'files': true,
                    'children': { count: true }, files: { count: true },
                    'owner': true
                }
            }
        );
        ctx.body = data;
    },
    async renameFolder(ctx) {
        let folder = await strapi.entityService.findOne(
            'plugin::upload.folder',
            ctx.params.id,
            {
                populate: {
                    'owner': true
                }
            }
        );
        if (!folder?.owner || folder?.owner.id !== ctx.state.user.id) {
            return ctx.unauthorized('renameFolder')
        }
        const data = await strapi.entityService.update(
            'plugin::upload.folder',
            ctx.params.id,
            {
                data: { name: ctx.request.body.data.name },
                populate: {
                    'files': true,
                    'children': { count: true }, files: { count: true },
                    'owner': true
                }
            }
        );
        ctx.body = data;
    },
    async renameFile(ctx) {
        let file = await strapi.entityService.findOne(
            'plugin::upload.file',
            ctx.params.id,
            {
                populate: {
                    'owner': true
                }
            }
        );
        if (!file?.owner || file?.owner.id !== ctx.state.user.id) {
            return ctx.unauthorized('renameFile')
        }
        const data = await strapi.entityService.update(
            'plugin::upload.file',
            ctx.params.id,
            {
                data: { name: ctx.request.body.data.name },
                populate: ['folder', 'owner']
            }
        );
        ctx.body = data;
    },
    async uploadFiles(ctx) {
        if (!ctx.request.files['files.file']) {
            return ctx.forbidden('uploadFiles')
        }
        let folder = await strapi.entityService.findOne(
            'plugin::upload.folder',
            ctx.params.id,
            {
                populate: {
                    'owner': true
                }
            }
        );
        if (!folder.owner || folder.owner.id !== ctx.state.user.id) {
            return ctx.unauthorized('uploadFiles')
        }
        // verify space
        const myDriveSize = await strapi
            .plugin('folder')
            .service('drive')
            .getMyDriveSize(ctx);

        const websiteSettings = await strapi.entityService.findOne('plugin::first-install.default-config', 1)
        const driveLimitSize = websiteSettings.driveLimitSize * 1000 * 1000;

        if (myDriveSize * 1000 + ctx.request.files['files.file'].size > driveLimitSize) {
            return ctx.unauthorized('driveSizeLimit')
        }

        const file = await strapi.plugins.upload.services.upload.upload({
            data: {
            },
            files: ctx.request.files['files.file']
        });
        const fileUpdated = await strapi.db.query('plugin::upload.file').update({
            where: { id: file[0].id },
            data: { folder: ctx.params.id, owner: ctx.state.user.id },
            populate: ['folder', 'owner']
        });
        ctx.body = fileUpdated;
    },
    async deleteFile(ctx, next) {
        let file = await strapi.entityService.findOne(
            'plugin::upload.file',
            ctx.params.id,
            {
                populate: {
                    'owner': true
                }
            }
        );
        if (!file?.owner || file?.owner.id !== ctx.state.user.id) {
            return ctx.unauthorized('renameFile')
        }
        const data = await strapi.plugins.upload.services.file.deleteByIds([ctx.params.id])
        ctx.body = data;
    },
    async deleteFolder(ctx, next) {
        let folder = await strapi.entityService.findOne(
            'plugin::upload.folder',
            ctx.params.id,
            {
                populate: {
                    'owner': true
                }
            }
        );
        if (!folder?.owner || folder?.owner.id !== ctx.state.user.id) {
            return ctx.unauthorized('deleteFolder')
        }
        const data = await strapi
            .plugin('folder')
            .service('drive')
            .deleteFolderDeep(ctx.params.id)
        ctx.body = data;
    }
};
