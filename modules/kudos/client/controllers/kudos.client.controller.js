(function () {
  'use strict';

  // Kudos controller
  angular
    .module('kudos')
    .controller('KudosController', KudosController);

  KudosController.$inject = ['$scope', '$state', 'Authentication', 'kudoResolve'];

  function KudosController ($scope, $state, Authentication, kudo) {
    var vm = this;

    vm.authentication = Authentication;
    vm.kudo = kudo;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Kudo
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.kudo.$remove($state.go('kudos.list'));
      }
    }

    // Save Kudo
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.kudoForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.kudo._id) {
        vm.kudo.$update(successCallback, errorCallback);
      } else {
        vm.kudo.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('kudos.view', {
          kudoId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
