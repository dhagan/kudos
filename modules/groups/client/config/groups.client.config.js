(function () {
  'use strict';

  angular
    .module('groups')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Groups',
      state: 'groups',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'groups', {
      title: 'List Groups',
      state: 'groups.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'groups', {
      title: 'Create Group',
      state: 'groups.create',
      roles: ['user']
    });
  }
})();
