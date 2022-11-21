module.exports = {
    getEmailengineUrl: function getEmailengineUrl(strapi, endpoint) {
        const config = strapi.config.get('plugin.emailengine')
        const domain = config?.domain || "http://localhost:3000"
        return `${domain}/v1/${endpoint}`;
    },
    getEmailengineToken: async function getEmailengineToken(strapi) {
        const config = strapi.config.get('plugin.emailengine')
        const token = config?.token
        if (token) {
            return {
                headers: { Authorization: `Bearer ${token}` }
            };
        } else {

            return {};
        }
    }
}
