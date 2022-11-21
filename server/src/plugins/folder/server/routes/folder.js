'use strict';

module.exports = {
  type: "content-api",
  routes: [
    {
      method: 'GET',
      path: '/:id',
      handler: 'folder.findOne',
      config: {
        roles: ['authenticated', "demo"],
      }
    },
    {
      method: 'DELETE',
      path: '/drive/file/:id',
      handler: 'folder.deleteFile',
      config: {
        roles: ['authenticated'],
      }
    },
    {
      method: 'DELETE',
      path: '/drive/folder/:id',
      handler: 'folder.deleteFolder',
      config: {
        roles: ['authenticated'],
      }
    },
    {
      method: 'GET',
      path: '/drive/my-drive',
      handler: 'drive.getMyDriveFolderRoot',
      config: {
        roles: ['authenticated', "demo"],
      }
    },
    {
      method: 'GET',
      path: '/drive/my-drive/size',
      handler: 'drive.getMyDriveSize',
      config: {
        roles: ['authenticated', "demo"],
      }
    },
    {
      method: 'GET',
      path: '/admin/drive/averaged-size',
      handler: 'drive.getAveragedDriveSize',
      config: {
        roles: ['authenticated', "demo"],
      }
    },
    {
      method: 'GET',
      path: '/admin/drive/total-size',
      handler: 'drive.getTotalDriveSize',
      config: {
        roles: ['authenticated', "demo"],
      }
    },
    {
      method: 'POST',
      path: '/drive/new-folder/:id',
      handler: 'folder.createFolder',
      config: {
        roles: ['authenticated'],
      }
    },
    {
      method: 'PUT',
      path: '/drive/rename-folder/:id',
      handler: 'folder.renameFolder',
      config: {
        roles: ['authenticated'],
      }
    },
    {
      method: 'PUT',
      path: '/drive/rename-file/:id',
      handler: 'folder.renameFile',
      config: {
        roles: ['authenticated'],
      }
    },
    {
      method: 'POST',
      path: '/drive/upload/:id',
      handler: 'folder.uploadFiles',
      config: {
        roles: ['authenticated'],
      }
    },
  ]
}