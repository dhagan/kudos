(function () {
  'use strict';

  // Achievements controller
  angular
    .module('achievements')
    .controller('AchievementsController', AchievementsController);

  AchievementsController.$inject = ['$scope', '$state', 'Authentication', 'achievementResolve'];

  function AchievementsController ($scope, $state, Authentication, achievement) {
    var vm = this;

    vm.authentication = Authentication;
    vm.achievement = achievement;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Achievement
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.achievement.$remove($state.go('achievements.list'));
      }
    }

    // Save Achievement
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.achievementForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.achievement._id) {
        vm.achievement.$update(successCallback, errorCallback);
      } else {
        vm.achievement.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('achievements.view', {
          achievementId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
