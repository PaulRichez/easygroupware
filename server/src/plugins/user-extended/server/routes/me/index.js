module.exports = {
  type: "content-api",
  routes: [
    {
      method: 'GET',
      path: '/me',
      handler: 'user-extended.me',
      config: {
        policies: [],
        roles: ['authenticated', "demo"]
      },
    },
    {
      method: 'PUT',
      path: '/me',
      handler: 'user-extended.updateMe',
      config: {
        policies: [],
        roles: ['authenticated']
      },
    }
  ]
};
