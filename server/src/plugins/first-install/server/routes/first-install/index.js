'use strict';

module.exports = {
    type: "content-api",
    routes: [
        {
            method: 'GET',
            path: '/check',
            handler: 'first-install.check',
            config: {
                auth: false,
            }
        },
        {
            method: 'POST',
            path: '/setup',
            handler: 'first-install.setup',
            config: {
                auth: false,
                policies: ['plugin::first-install.isFirstInstall']
            },
        }
    ]
}