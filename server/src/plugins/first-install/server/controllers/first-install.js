'use strict';


module.exports = {
  async check(ctx, next) {
    const countUsers = await strapi.db.query('plugin::users-permissions.user').count();
    if (!countUsers) {
      ctx.body = { status: true }
    }
    else {
      const defaultConfig = await strapi.plugin('first-install')
        .service('default-config').find({ populate: ['logo'] })
      ctx.body = { status: false, defaultConfig: defaultConfig }
    }
  },
  async setup(ctx, next) {
    const forlders = ['avatars', 'drives', 'content'];
    let contentFolder = null;
    for (const folder of forlders) {
      const result = await strapi
        .plugin('first-install')
        .service('folders')
        .createFolderIfDoesNotExist(folder);
      if (folder === 'content') {
        contentFolder = result;
      }
    }

    const data = JSON.parse(ctx.request.body.data);

    //default config
    if (ctx.request.files['files.logo']) {
      const logo = await strapi.plugins.upload.services.upload.upload({
        data: {
        },
        files: ctx.request.files['files.logo']
      });
      await strapi.db.query('plugin::upload.file').update({
        where: { id: logo[0].id },
        data: { folder: contentFolder.id }
      });
      data.site.logo = logo[0].id;
    }
    const defaultConfig = await strapi.plugin('first-install')
      .service('default-config').createOrUpdate({ data: data.site })

    // group-user
    let group = await strapi.db.query('plugin::user-extended.user-group').findOne({
      where: { name: 'Administrateur' },
    });
    if (!group) {
      group = await strapi.query('plugin::user-extended.user-group').create({
        data: {
          name: 'Administrateur',
          description: 'Groupe administrateur',
        },
      });
    }

    // first User
    const firstUserCtx = ctx;
    firstUserCtx.request.file = null;
    data.firstUser.user_groups = [group];
    data.firstUser.confirmed = true;
    data.firstUser.blocked = false;
    data.firstUser.user_settings = {
      theme: data.site.theme
    };
    firstUserCtx.request.body = data.firstUser;
    await strapi.plugin('users-permissions').controller('user').create(firstUserCtx)


    // permisisons role
    await strapi.entityService.create('plugin::users-permissions.permission', {
      data: {
        action: 'plugin::users-permissions.user.find',
        role: 1,
      },
    });
    await strapi.entityService.create('plugin::users-permissions.permission', {
      data: {
        action: 'plugin::users-permissions.user.findOne',
        role: 1,
      },
    });

    ctx.body = { status: 'ok' };
  }
};
