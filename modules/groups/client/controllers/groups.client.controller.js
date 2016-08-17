(function () {
  'use strict';

  // Groups controller
  angular
    .module('groups')
    .controller('GroupsController', GroupsController);

  GroupsController.$inject = ['$scope', '$state', 'Authentication', 'groupResolve'];

  function GroupsController ($scope, $state, Authentication, group) {
    var vm = this;

    vm.authentication = Authentication;
    vm.group = group;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Group
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.group.$remove($state.go('groups.list'));
      }
    }

    // Save Group
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.groupForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.group._id) {
        vm.group.$update(successCallback, errorCallback);
      } else {
        vm.group.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('groups.view', {
          groupId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
