(function () {
  'use strict';

  angular
    .module('kudos')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Kudos',
      state: 'kudos',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'kudos', {
      title: 'List Kudos',
      state: 'kudos.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'kudos', {
      title: 'Create Kudo',
      state: 'kudos.create',
      roles: ['user']
    });
  }
})();
