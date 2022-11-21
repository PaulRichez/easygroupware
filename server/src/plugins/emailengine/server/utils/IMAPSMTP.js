module.exports = {
    getIMAPSMTP: async function  getIMAPSMTP(strapi) {
        return await strapi.entityService.findMany(
            'api::imap-smtp.imap-smtp',
            { populate: ['imap', 'smtp'] }
        );
    },
}
