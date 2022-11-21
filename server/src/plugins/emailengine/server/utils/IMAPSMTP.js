module.exports = {
    getIMAPSMTP: async function  getEmailengineUrl(strapi,strapi) {
        return await strapi.entityService.findMany(
            'api::imap-smtp.imap-smtp',
            { populate: ['imap', 'smtp'] }
        );
    },
}
