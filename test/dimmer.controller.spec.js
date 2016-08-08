describe("ui.dimmer", function() {

  describe("DimmerController", function() {

    var $scope, $controller, $element, controller;
    var dimmerSettings;

    beforeEach(module('ui.dimmer'));

    beforeEach(inject(function($rootScope, _$controller_, _dimmerSettings_) {
      $scope = $rootScope.$new();
      $controller = _$controller_;
      dimmerSettings = _dimmerSettings_;
    }));

    describe("settings", function() {
      it("should use the settings from `dimmerSettings`", function() {
        $element = angular.element('<div class="ui dimmer"></div>');
        controller = $controller('DimmerController', {
          $scope: $scope,
          $element: $element
        });
        expect(controller.settings).toEqual(dimmerSettings.defaults);
      });
    });

    describe("the starting state", function() {
      it("should be based on the classes applied to $element", function() {
        var variations = ["visible active", "active", "visible", ""];
        angular.forEach(variations, function(variation) {
          $element = angular.element('<div class="ui dimmer"></div>');
          $element.addClass(variation);
          controller = $controller('DimmerController', {
            $scope: $scope,
            $element: $element
          });
          expect(controller.isVisible())
            .toEqual(variation != "");
          expect(controller.isVisible())
            .toEqual(variation != "");
        });
      });
    });

    describe("set, remove, show and hide functions", function() {
      var controller;
      beforeEach(function() {
        $element = angular.element('<div class="ui dimmer"></div>');
        controller = $controller('DimmerController', {
          $scope: $scope,
          $element: $element
        });
      });

      it("for active state", function() {
        controller.setActive();
        expect(controller.isActive()).toEqual(true);
        expect(controller.isVisible()).toEqual(true);
        controller.removeActive();
        expect(controller.isActive()).toEqual(false);
        expect(controller.isVisible()).toEqual(true);
      });

      it("for visible state", function() {
        controller.setVisible();
        expect(controller.isVisible()).toEqual(true);
        expect(controller.isActive()).toEqual(false);
        controller.removeVisible();
        expect(controller.isVisible()).toEqual(false);
        expect(controller.isActive()).toEqual(false);
      });

      describe("show", function() {

        it("should animate in", function() {
          controller.show();
          expect(controller.isVisible()).toEqual(true);
          expect(controller.isActive()).toEqual(false);
          expect(controller.isAnimating()).toEqual(true);
          expect(controller.isAnimatingIn()).toEqual(true);
          controller.setActive();
          expect(controller.isAnimating()).toEqual(false);
          expect(controller.isAnimatingIn()).toEqual(false);
          expect(controller.isActive()).toEqual(true);
        });

        it("should return a Promise", function() {
          var callbackHasBeenCalled = false;
          controller.show().then(function() {
            callbackHasBeenCalled = true;
          });
          expect(callbackHasBeenCalled).toEqual(false);
          controller.setActive();
          $scope.$digest();
          expect(callbackHasBeenCalled).toEqual(true);
        });
      });

      describe("hide", function() {

        it("should animate out", function() {
          controller.setActive();
          controller.hide();
          expect(controller.isActive()).toEqual(false);
          expect(controller.isVisible()).toEqual(true);
          expect(controller.isAnimating()).toEqual(true);
          expect(controller.isAnimatingOut()).toEqual(true);
          controller.removeVisible();
          expect(controller.isAnimating()).toEqual(false);
          expect(controller.isAnimatingIn()).toEqual(false);
          expect(controller.isActive()).toEqual(false);
          expect(controller.isVisible()).toEqual(false);
        });

        it("should return a Promise", function() {
          controller.setActive();
          var callbackHasBeenCalled = false;
          controller.hide().then(function() {
            callbackHasBeenCalled = true;
          });
          expect(callbackHasBeenCalled).toEqual(false);
          controller.removeVisible();
          $scope.$digest();
          expect(callbackHasBeenCalled).toEqual(true);
        });

      });

    });

  });

});
