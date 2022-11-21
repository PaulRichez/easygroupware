'use strict';
const { getEmailengineUrl, getEmailengineToken } = require('../utils/axios');
const qs = require('qs');
const axios = require('axios').default;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.maxBodyLength = Infinity;
/**
 * message service.
 */

module.exports = ({ strapi }) => ({
    async search(idUser, body, ctxQuery) {
        try {
            const query = qs.stringify({
                path: ctxQuery.path,
                page: ctxQuery.page,
                pageSize: ctxQuery.pageSize
            });
            const url =  getEmailengineUrl(strapi,`account/${idUser}/search?${query}`);
            const config = await getEmailengineToken(strapi);
            const response = await axios.post(url, body, config);
            return response.data;
        } catch (err) {
            return err?.response?.data
        }
    },
    async get(idUser, idMessage, ctxQuery) {
        try {
            const query = qs.stringify({
                textType: ctxQuery.textType || '--',
                embedAttachedImages: ctxQuery.embedAttachedImages || false,
                documentStore: ctxQuery.documentStore || false
            });
            const url =  getEmailengineUrl(strapi,`account/${idUser}/message/${idMessage}?${query}`);
            const config = await getEmailengineToken(strapi);
            const response = await axios.get(url, config);
            return response.data;
        } catch (err) {
            return err?.response?.data
        }
    },
    async update(idUser, idMessage, ctxBody) {
        try {
            const url =  getEmailengineUrl(strapi,`account/${idUser}/message/${idMessage}`);
            const config = await getEmailengineToken(strapi);
            const response = await axios.put(url, ctxBody.data, config);
            return response.data;
        } catch (err) {
            return err?.response?.data
        }
    },
    async downloadAttachment(idUser, idAttachment) {
        try {
            const url =  getEmailengineUrl(strapi,`account/${idUser}/attachment/${idAttachment}`);
            const config = await getEmailengineToken(strapi);
            config.responseType = 'stream';
            const response = await axios.get(url, config);
            return response.data;
        } catch (err) {
            return err?.response?.data
        }
    },
    async submit(idUser, ctxBody) {
        try {
            const url =  getEmailengineUrl(strapi,`account/${idUser}/submit`);
            const config = await getEmailengineToken(strapi);
            const response = await axios.post(url, ctxBody.data, config);
            return response.data;
        } catch (err) {
            return err?.response?.data
        }
    },
    async getMessageSource(idUser, idMessage) {
        try {
            const url =  getEmailengineUrl(strapi,`account/${idUser}/message/${idMessage}/source`);
            const config = await getEmailengineToken(strapi);
            config.responseType = 'stream';
            const response = await axios.get(url, config);
            return response.data;
        } catch (err) {
            return err?.response?.data
        }
    },
});
