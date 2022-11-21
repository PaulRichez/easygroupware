'use strict';

module.exports = {
    type: "content-api",
    routes: [
        {
            method: 'GET',
            path: '/account',
            handler: 'account.findMe',
            config: {
                roles: ['authenticated', "demo"]
            }
        },
        {
            method: 'POST',
            path: '/account/createOrUpdate',
            handler: 'account.createOrUpdate',
            config: {
                roles: ['authenticated']
            }
        },
        {
            method: 'GET',
            path: '/countAccounts',
            handler: 'account.countAccounts',
            config: {
                roles: ['authenticated', "demo"]
            }
        },
    ]
}