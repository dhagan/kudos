(function () {
  'use strict';

  angular
    .module('achievements')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Achievements',
      state: 'achievements',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'achievements', {
      title: 'List Achievements',
      state: 'achievements.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'achievements', {
      title: 'Create Achievement',
      state: 'achievements.create',
      roles: ['user']
    });
  }
})();
