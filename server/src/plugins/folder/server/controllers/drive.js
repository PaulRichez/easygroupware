'use strict';


module.exports = {
  async getMyDriveFolderRoot(ctx, next) {
    const myDriveFolder = await strapi
      .plugin('folder')
      .service('drive')
      .getMyDriveFolderRoot(ctx);
    ctx.body = myDriveFolder;
  },
  async getMyDriveSize(ctx, next) {
    const myDriveFolder = await strapi
      .plugin('folder')
      .service('drive')
      .getMyDriveSize(ctx);
    ctx.body = myDriveFolder;
  },
  async getAveragedDriveSize(ctx, next) {
    return ctx.body = await strapi
      .plugin('folder')
      .service('drive')
      .getAveragedDriveSize();
  },
  async getTotalDriveSize(ctx, next) {
    return ctx.body = await strapi
      .plugin('folder')
      .service('drive')
      .getTotalDriveSize();
  }
};
