(function () {
  'use strict';

  describe('Achievements Route Tests', function () {
    // Initialize global variables
    var $scope,
      AchievementsService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _AchievementsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      AchievementsService = _AchievementsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('achievements');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/achievements');
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
          AchievementsController,
          mockAchievement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('achievements.view');
          $templateCache.put('modules/achievements/client/views/view-achievement.client.view.html', '');

          // create mock Achievement
          mockAchievement = new AchievementsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Achievement Name'
          });

          //Initialize Controller
          AchievementsController = $controller('AchievementsController as vm', {
            $scope: $scope,
            achievementResolve: mockAchievement
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:achievementId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.achievementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            achievementId: 1
          })).toEqual('/achievements/1');
        }));

        it('should attach an Achievement to the controller scope', function () {
          expect($scope.vm.achievement._id).toBe(mockAchievement._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/achievements/client/views/view-achievement.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          AchievementsController,
          mockAchievement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('achievements.create');
          $templateCache.put('modules/achievements/client/views/form-achievement.client.view.html', '');

          // create mock Achievement
          mockAchievement = new AchievementsService();

          //Initialize Controller
          AchievementsController = $controller('AchievementsController as vm', {
            $scope: $scope,
            achievementResolve: mockAchievement
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.achievementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/achievements/create');
        }));

        it('should attach an Achievement to the controller scope', function () {
          expect($scope.vm.achievement._id).toBe(mockAchievement._id);
          expect($scope.vm.achievement._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/achievements/client/views/form-achievement.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          AchievementsController,
          mockAchievement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('achievements.edit');
          $templateCache.put('modules/achievements/client/views/form-achievement.client.view.html', '');

          // create mock Achievement
          mockAchievement = new AchievementsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Achievement Name'
          });

          //Initialize Controller
          AchievementsController = $controller('AchievementsController as vm', {
            $scope: $scope,
            achievementResolve: mockAchievement
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:achievementId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.achievementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            achievementId: 1
          })).toEqual('/achievements/1/edit');
        }));

        it('should attach an Achievement to the controller scope', function () {
          expect($scope.vm.achievement._id).toBe(mockAchievement._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/achievements/client/views/form-achievement.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
