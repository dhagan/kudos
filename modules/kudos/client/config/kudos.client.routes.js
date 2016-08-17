(function () {
  'use strict';

  angular
    .module('kudos')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('kudos', {
        abstract: true,
        url: '/kudos',
        template: '<ui-view/>'
      })
      .state('kudos.list', {
        url: '',
        templateUrl: 'modules/kudos/client/views/list-kudos.client.view.html',
        controller: 'KudosListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Kudos List'
        }
      })
      .state('kudos.create', {
        url: '/create',
        templateUrl: 'modules/kudos/client/views/form-kudo.client.view.html',
        controller: 'KudosController',
        controllerAs: 'vm',
        resolve: {
          kudoResolve: newKudo
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Kudos Create'
        }
      })
      .state('kudos.edit', {
        url: '/:kudoId/edit',
        templateUrl: 'modules/kudos/client/views/form-kudo.client.view.html',
        controller: 'KudosController',
        controllerAs: 'vm',
        resolve: {
          kudoResolve: getKudo
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Kudo {{ kudoResolve.name }}'
        }
      })
      .state('kudos.view', {
        url: '/:kudoId',
        templateUrl: 'modules/kudos/client/views/view-kudo.client.view.html',
        controller: 'KudosController',
        controllerAs: 'vm',
        resolve: {
          kudoResolve: getKudo
        },
        data:{
          pageTitle: 'Kudo {{ articleResolve.name }}'
        }
      });
  }

  getKudo.$inject = ['$stateParams', 'KudosService'];

  function getKudo($stateParams, KudosService) {
    return KudosService.get({
      kudoId: $stateParams.kudoId
    }).$promise;
  }

  newKudo.$inject = ['KudosService'];

  function newKudo(KudosService) {
    return new KudosService();
  }
})();
