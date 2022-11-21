'use strict';
const { getEmailengineToken, getEmailengineUrl } = require('../utils/axios');
const { getIMAPSMTP } = require('../utils/IMAPSMTP');
const axios = require('axios').default;
const qs = require('qs');
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.maxBodyLength = Infinity;

/**
 * emailengine service.
 */

const getFormatedIMAPSMTP = async (strapi) => {
    const IMAPSMTP = await getIMAPSMTP(strapi);
    delete IMAPSMTP.imap.id
    delete IMAPSMTP.smtp.id
    if (!IMAPSMTP.imap?.tls?.minVersion) {
        delete IMAPSMTP.imap.tls.minVersion
    }
    if (!IMAPSMTP.smtp?.tls?.minVersion) {
        delete IMAPSMTP.smtp.tls.minVersion
    }
    return IMAPSMTP;
}


module.exports = ({ strapi }) => ({
    async create(idUser, emailUser, password) {
        const IMAPSMTP = await getFormatedIMAPSMTP(strapi);
        try {
            const url =  getEmailengineUrl(strapi,'account');
            const config = await getEmailengineToken(strapi);
            const payload = {
                account: idUser.toString(),
                name: emailUser,
                email: emailUser,
                imap: { ...IMAPSMTP.imap, auth: { user: emailUser, pass: password } },
                smtp: { ...IMAPSMTP.smtp, auth: { user: emailUser, pass: password } },
            };
            const response = await axios.post(url, payload, config);
            return response.data;
        } catch (err) {
            return err?.response?.data
        }
    },
    async update(idUser, emailUser, password) {
        const IMAPSMTP = await getFormatedIMAPSMTP(strapi);
        try {
            const url =  getEmailengineUrl(strapi,`account/${idUser}`);
            const config = await getEmailengineToken(strapi);
            const payload = {
                name: emailUser,
                email: emailUser,
                imap: { ...IMAPSMTP.imap, auth: { user: emailUser, pass: password } },
                smtp: { ...IMAPSMTP.smtp, auth: { user: emailUser, pass: password } },
            };
            const response = await axios.put(url, payload, config);
            return response.data;
        } catch (err) {
            return err?.response?.data
        }
    },
    async findOne(idAccount) {
        try {
            const url =  getEmailengineUrl(strapi,`account/${idAccount}`);
            const config = await getEmailengineToken(strapi);
            const response = await axios.get(url, config);
            return response.data;
        } catch (err) {
            console.log(err)
            return err?.response?.data
        }
    },
});
