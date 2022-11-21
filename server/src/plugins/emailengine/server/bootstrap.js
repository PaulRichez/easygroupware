'use strict';
const { getEmailengineUrl, getEmailengineToken } = require('./utils/axios');
const axios = require('axios').default;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.maxBodyLength = Infinity;
module.exports = async ({ strapi }) => {
  // bootstrap phase
  try {
    const url = getEmailengineUrl(strapi, `accounts`);
    const config = await getEmailengineToken(strapi);
    await axios.get(url, config);
  } catch (err) {

  }
};
