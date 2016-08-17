(function () {
  'use strict';

  describe('Kudos Route Tests', function () {
    // Initialize global variables
    var $scope,
      KudosService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _KudosService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      KudosService = _KudosService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('kudos');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/kudos');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          KudosController,
          mockKudo;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('kudos.view');
          $templateCache.put('modules/kudos/client/views/view-kudo.client.view.html', '');

          // create mock Kudo
          mockKudo = new KudosService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Kudo Name'
          });

          //Initialize Controller
          KudosController = $controller('KudosController as vm', {
            $scope: $scope,
            kudoResolve: mockKudo
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:kudoId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.kudoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            kudoId: 1
          })).toEqual('/kudos/1');
        }));

        it('should attach an Kudo to the controller scope', function () {
          expect($scope.vm.kudo._id).toBe(mockKudo._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/kudos/client/views/view-kudo.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          KudosController,
          mockKudo;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('kudos.create');
          $templateCache.put('modules/kudos/client/views/form-kudo.client.view.html', '');

          // create mock Kudo
          mockKudo = new KudosService();

          //Initialize Controller
          KudosController = $controller('KudosController as vm', {
            $scope: $scope,
            kudoResolve: mockKudo
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.kudoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/kudos/create');
        }));

        it('should attach an Kudo to the controller scope', function () {
          expect($scope.vm.kudo._id).toBe(mockKudo._id);
          expect($scope.vm.kudo._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/kudos/client/views/form-kudo.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          KudosController,
          mockKudo;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('kudos.edit');
          $templateCache.put('modules/kudos/client/views/form-kudo.client.view.html', '');

          // create mock Kudo
          mockKudo = new KudosService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Kudo Name'
          });

          //Initialize Controller
          KudosController = $controller('KudosController as vm', {
            $scope: $scope,
            kudoResolve: mockKudo
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:kudoId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.kudoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            kudoId: 1
          })).toEqual('/kudos/1/edit');
        }));

        it('should attach an Kudo to the controller scope', function () {
          expect($scope.vm.kudo._id).toBe(mockKudo._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/kudos/client/views/form-kudo.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
