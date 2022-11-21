'use strict';

module.exports = {
    type: "content-api",
    routes: [
        {
            method: 'POST',
            path: '/messages',
            handler: 'message.search',
            config: {
                roles: ['authenticated', "demo"]
            }
        },
        {
            method: 'GET',
            path: '/message/:id',
            handler: 'message.get',
            config: {
                roles: ['authenticated', "demo"]
            }
        },
        {
            method: 'GET',
            path: '/message/:id/source',
            handler: 'message.getMessageSource',
            config: {
                roles: ['authenticated', "demo"]
            }
        },
        {
            method: 'PUT',
            path: '/message/:id',
            handler: 'message.update',
            config: {
                roles: ['authenticated']
            }
        },
        {
            method: 'GET',
            path: '/attachment/:id',
            handler: 'message.downloadAttachment',
            config: {
                roles: ['authenticated', "demo"]
            }
        },
        {
            method: 'POST',
            path: '/submit',
            handler: 'message.submit',
            config: {
                roles: ['authenticated'],
            }
        }
    ]
}