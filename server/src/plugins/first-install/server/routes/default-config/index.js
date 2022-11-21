'use strict';

module.exports = {
    type: "content-api",
    routes: [
        {
            method: 'GET',
            path: '/default-config',
            handler: 'default-config.find',
            config: {
                auth: false,
            }
        },
        {
            method: 'PUT',
            path: '/default-config',
            handler: 'default-config.update',
            config: {
                roles: ['authenticated']
            }
        },
    ]
}