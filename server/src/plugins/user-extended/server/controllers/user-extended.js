'use strict';
const _ = require('lodash');
const utils = require('@strapi/utils');
const { sanitize } = utils;

const sanitizeOutput = (user, ctx) => {
  const schema = strapi.getModel('plugin::users-permissions.user');
  const { auth } = ctx.state;

  return sanitize.contentAPI.output(user, schema, { auth });
};

module.exports = ({ strapi }) => ({
  async me(ctx) {
    let data = await strapi.entityService.findOne(
      'plugin::users-permissions.user',
      ctx.state.user.id,
      ctx.query
    );
    if (data) {
      data = await sanitizeOutput(data, ctx);
    }

    ctx.body = data;
  },
  async updateMe(ctx) {
    const data = JSON.parse(ctx.request.body.data)
    const newData = _.pick(data, ['userExtended', 'user_settings']);
    // Update the user and return the sanitized data
    let newuser = await strapi.entityService.update(
      'plugin::users-permissions.user',
      ctx.state.user.id,
      { data: newData, ...ctx.query },
      ctx.query
    );

    if (newuser) {
      newuser = await sanitizeOutput(newuser, ctx);
    }

    ctx.body = newuser;
  },
  async update(ctx) {
    const data = JSON.parse(ctx.request.body.data)
    const newData = _.pick(data, ['userExtended', 'user_settings', 'user_groups']);
    // Update the user and return the sanitized data
    let newuser = await strapi.entityService.update(
      'plugin::users-permissions.user',
      ctx.params.id,
      { data: newData, ...ctx.query },
      ctx.query
    );

    if (newuser) {
      newuser = await sanitizeOutput(newuser, ctx);
    }

    ctx.body = newuser;
  },
  async find(ctx) {
    const data = await strapi.db.query('plugin::users-permissions.user',).findWithCount(
      ctx.query
    );
    if (data[0]) {
      data[0] = await Promise.all(data[0].map((user) => sanitizeOutput(user, ctx)));
    }
    ctx.body = { data: data[0], meta: { pagination: { total: data[1] } } }
  },
  async findOne(ctx) {
    await strapi.plugin('users-permissions').controller('user').findOne(ctx)
  },
  async count(ctx) {
    await strapi.plugin('users-permissions').controller('user').count(ctx)
  },
  async create(ctx) {
    const websiteSettings = await strapi.entityService.findOne('plugin::first-install.default-config', 1)
    const data = JSON.parse(ctx.request.body.data);
    data.confirmed = true;
    data.blocked = false;
    data.user_settings = {
      theme: websiteSettings.theme
    };
    ctx.request.body = data;
    return await strapi.plugin('users-permissions').controller('user').create(ctx)
  }
});
