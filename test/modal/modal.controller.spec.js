describe("ui.modal", function() {

  describe("ModalController", function() {

    var $scope, $element, controller;
    var $compile, $controller;

    beforeEach(module('ui.modal'));

    beforeEach(inject(function($rootScope, _$controller_, _$compile_) {
      $scope = $rootScope.$new();
      $controller = _$controller_;
      $compile = _$compile_;
    }));

    describe("show, hide, approve and deny", function() {



    });

    describe("show function", function() {


      var controller;

      beforeEach(function() {
        $element = angular.element('<div class="ui modal"></div>');
        $element.append(angular.element('<p>A paragraph.</p>'));
        $compile($element)($scope);
        controller = $element.controller('modal');
      });

      describe("Promise returned", function() {

        it("should resolve as approved when the modal is approved", function(done) {
          controller.show().then(function(result) {
            expect(result.resolution).toEqual("approved");
            done();
          });
          controller.approve();
          controller.removeVisible();
          $scope.$digest();
        });

        it("should resolve as denied when the modal is denied", function(done) {
          controller.show().then(function(result) {
            expect(result.resolution).toEqual("denied");
            done();
          });
          controller.deny();
          controller.removeVisible();
          $scope.$digest();
        });

        it("should notify when the modal becomes visible", function(done) {
          controller.show().then(function() {

          }, function() {

          }, function() {
            done();
          });
          controller.setVisible();
          controller.setActive();
          $scope.$digest();
        });
      });
    });

    describe("set, remove, show and hide functions", function() {

      var controller;

      beforeEach(function() {
        $element = angular.element('<div class="ui modal"></div>');
        $element.append(angular.element('<p>A paragraph.</p>'));
        $compile($element)($scope);
        controller = $element.controller('modal');
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
