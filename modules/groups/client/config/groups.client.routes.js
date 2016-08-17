(function () {
  'use strict';

  angular
    .module('groups')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('groups', {
        abstract: true,
        url: '/groups',
        template: '<ui-view/>'
      })
      .state('groups.list', {
        url: '',
        templateUrl: 'modules/groups/client/views/list-groups.client.view.html',
        controller: 'GroupsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Groups List'
        }
      })
      .state('groups.create', {
        url: '/create',
        templateUrl: 'modules/groups/client/views/form-group.client.view.html',
        controller: 'GroupsController',
        controllerAs: 'vm',
        resolve: {
          groupResolve: newGroup
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Groups Create'
        }
      })
      .state('groups.edit', {
        url: '/:groupId/edit',
        templateUrl: 'modules/groups/client/views/form-group.client.view.html',
        controller: 'GroupsController',
        controllerAs: 'vm',
        resolve: {
          groupResolve: getGroup
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Group {{ groupResolve.name }}'
        }
      })
      .state('groups.view', {
        url: '/:groupId',
        templateUrl: 'modules/groups/client/views/view-group.client.view.html',
        controller: 'GroupsController',
        controllerAs: 'vm',
        resolve: {
          groupResolve: getGroup
        },
        data:{
          pageTitle: 'Group {{ articleResolve.name }}'
        }
      });
  }

  getGroup.$inject = ['$stateParams', 'GroupsService'];

  function getGroup($stateParams, GroupsService) {
    return GroupsService.get({
      groupId: $stateParams.groupId
    }).$promise;
  }

  newGroup.$inject = ['GroupsService'];

  function newGroup(GroupsService) {
    return new GroupsService();
  }
})();
