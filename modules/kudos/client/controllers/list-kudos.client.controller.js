(function () {
  'use strict';

  angular
    .module('kudos')
    .controller('KudosListController', KudosListController);

  KudosListController.$inject = ['KudosService'];

  function KudosListController(KudosService) {
    var vm = this;

    vm.kudos = KudosService.query();
  }
})();
