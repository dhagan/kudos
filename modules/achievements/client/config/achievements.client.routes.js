(function () {
  'use strict';

  angular
    .module('achievements')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('achievements', {
        abstract: true,
        url: '/achievements',
        template: '<ui-view/>'
      })
      .state('achievements.list', {
        url: '',
        templateUrl: 'modules/achievements/client/views/list-achievements.client.view.html',
        controller: 'AchievementsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Achievements List'
        }
      })
      .state('achievements.create', {
        url: '/create',
        templateUrl: 'modules/achievements/client/views/form-achievement.client.view.html',
        controller: 'AchievementsController',
        controllerAs: 'vm',
        resolve: {
          achievementResolve: newAchievement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Achievements Create'
        }
      })
      .state('achievements.edit', {
        url: '/:achievementId/edit',
        templateUrl: 'modules/achievements/client/views/form-achievement.client.view.html',
        controller: 'AchievementsController',
        controllerAs: 'vm',
        resolve: {
          achievementResolve: getAchievement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Achievement {{ achievementResolve.name }}'
        }
      })
      .state('achievements.view', {
        url: '/:achievementId',
        templateUrl: 'modules/achievements/client/views/view-achievement.client.view.html',
        controller: 'AchievementsController',
        controllerAs: 'vm',
        resolve: {
          achievementResolve: getAchievement
        },
        data:{
          pageTitle: 'Achievement {{ articleResolve.name }}'
        }
      });
  }

  getAchievement.$inject = ['$stateParams', 'AchievementsService'];

  function getAchievement($stateParams, AchievementsService) {
    return AchievementsService.get({
      achievementId: $stateParams.achievementId
    }).$promise;
  }

  newAchievement.$inject = ['AchievementsService'];

  function newAchievement(AchievementsService) {
    return new AchievementsService();
  }
})();
