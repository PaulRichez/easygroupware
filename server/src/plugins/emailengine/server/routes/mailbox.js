'use strict';

module.exports = {
    type: "content-api",
    routes: [
        {
            method: 'GET',
            path: '/mailboxes',
            handler: 'mailbox.find',
            config: {
                roles: ['authenticated', "demo"]
            }
        },
        {
            method: 'POST',
            path: '/mailbox',
            handler: 'mailbox.create',
            config: {
                roles: ['authenticated']
            }
        },
        {
            method: 'DELETE',
            path: '/mailbox',
            handler: 'mailbox.delete',
            config: {
                roles: ['authenticated']
            }
        },
    ]
}