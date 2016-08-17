//Kudos service used to communicate Kudos REST endpoints
(function () {
  'use strict';

  angular
    .module('kudos')
    .factory('KudosService', KudosService);

  KudosService.$inject = ['$resource'];

  function KudosService($resource) {
    return $resource('api/kudos/:kudoId', {
      kudoId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
