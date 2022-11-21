'use strict';
const { getEmailengineToken, getEmailengineUrl } = require('../utils/axios');
const axios = require('axios').default;
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + '25e8ffcbd2364e8a827c898e02adc9003f9eb4e7a83afe1c786c0fd9ced58951';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.maxBodyLength = Infinity;
/**
 * stats service.
 */

module.exports = ({ strapi }) => ({
    async getStats() {
        try {
            const url =  getEmailengineUrl(strapi,`stats`);
            const config = await getEmailengineToken(strapi);
            const response = await axios.get(url, config);
            return response.data;
        } catch (err) {
            console.log(err)
            return err?.response?.data
        }
    }
});
