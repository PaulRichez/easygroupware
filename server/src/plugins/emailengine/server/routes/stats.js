'use strict';

module.exports = {
    type: "content-api",
    routes: [
        {
            method: 'GET',
            path: '/stats',
            handler: 'stats.get',
            config: {
                roles: ['authenticated', "demo"]
            }
        },
    ]
}