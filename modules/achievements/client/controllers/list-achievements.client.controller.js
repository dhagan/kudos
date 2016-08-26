(function () {
  'use strict';

  angular
    .module('achievements')
    .controller('AchievementsListController', AchievementsListController);

  AchievementsListController.$inject = ['AchievementsService'];

  function AchievementsListController(AchievementsService) {
    var vm = this;

    vm.achievements = AchievementsService.query();
  }
})();
