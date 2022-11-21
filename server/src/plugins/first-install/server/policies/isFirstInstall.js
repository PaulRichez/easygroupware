'use strict';

/**
 * `isFirstInstall` policy
 */

module.exports = async(policyContext, config, { strapi }) => {
    // Add your own logic here.
    strapi.log.info('In isFirstInstall policy.');

    const countUsers = await strapi.db.query('plugin::users-permissions.user').count();

    if (!countUsers) {
      return true;
    }

    return false;
};
