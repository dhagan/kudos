//Achievements service used to communicate Achievements REST endpoints
(function () {
  'use strict';

  angular
    .module('achievements')
    .factory('AchievementsService', AchievementsService);

  AchievementsService.$inject = ['$resource'];

  function AchievementsService($resource) {
    return $resource('api/achievements/:achievementId', {
      achievementId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
