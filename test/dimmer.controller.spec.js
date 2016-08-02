describe("ui.modal", function() {

  // beforeEach(function() {
  //   var testApp;
  //   testApp = angular.module("test", ["ui.modal", "ngAnimateMock"]).controller("TestCtrl", function($scope, data) {
  //     this.ctrlAsData = data;
  //     return $scope.ctrlData = data;
  //   });
  //   return angular.mock.module("test");
  // });

  describe("DimmerController", function() {

    var $scope, $controller, $element;

    beforeEach(module('ui.dimmer'));

    beforeEach(inject(function($rootScope, _$controller_) {
      $scope = $rootScope.$new();
      $controller = _$controller_;
    }));

    describe("the starting state", function() {
      it("should be based on the classes applied to $element", function() {
        var controller;
        var variations = ["visible active", "active", "visible", ""];
        angular.forEach(variations, function(variation) {
          $element = angular.element('<div class="ui dimmer"></div>');
          $element.addClass(variation);
          controller = $controller('DimmerController', {
            $scope: $scope,
            $element: $element
          });
          expect(controller.is.visible())
            .toEqual(variation != "");
          expect(controller.is.visible())
            .toEqual(variation != "");
        });
      });
    });
  });



});
