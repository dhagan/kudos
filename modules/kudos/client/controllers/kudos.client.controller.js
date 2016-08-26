(function () {
  'use strict';

  // Kudos controller
  angular
    .module('kudos')
    .controller('KudosController', KudosController);

  KudosController.$inject = ['$scope', '$state', 'Authentication', 'kudoResolve', 'Users', 'TeamsService'];

  function KudosController($scope, $state, Authentication, kudo, Users, TeamsService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.kudo = kudo;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.users = getUsers();
    vm.teams = TeamsService.query();

    vm.kudoTypes = [
      'bold',
      'genuine',
      'supportive',
      'candid',
      'globally aware',
      'reliable',
      'dedicated',
      'speedy',
      'innovative'
    ];

    vm.kudoAwards = [
      'blue star',
      'good job',
      'impressive',
      'excellent'
    ];
    vm.kudoPoints = [
      5,25,50,100,200,300,400,500,1000
    ];

    var badgeClass = [
      'label-default',
      'label-primary',
      'label-success',
      'label-info',
      'label-warning',
      'label-danger'
    ];

    vm.getBadgeStyle = function(index) {
      return badgeClass[index%6];
    };

    function getUsers() {
      return Users.query();
    }

    //function getUsers() {
    //  Users.get().$promise.then(function (value) {
    //      // vm.error = value.body + " created";
    //      vm.error = value.fileName + " created";
    //      console.log(value);
    //    }, function (error) {
    //      debugger;
    //      vm.error = error.data.message;
    //    });
    //}

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
