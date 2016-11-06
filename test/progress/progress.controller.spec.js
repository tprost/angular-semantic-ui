describe("ui.progress", function() {

  describe("ProgressController", function() {

    var $scope, $controller, $element, controller;

    beforeEach(module('ui.progress'));

    beforeEach(inject(function($rootScope, _$controller_) {
      $scope = $rootScope.$new();
      $controller = _$controller_;
      controller = $controller('ProgressController', {

      });
    }));

    describe("the starting state", function() {
      it("should not have a total, value or percent", function() {
        expect(controller.getValue()).toBeNull();
        expect(controller.getTotal()).toBeNull();
        expect(controller.getPercent()).toBeNull();
      });
    });

    describe("setting the total, value or percent", function() {
      it("should work", function() {
        controller.setValue(5);
        controller.setTotal(10);
        expect(controller.getValue()).toEqual(5);
        expect(controller.getTotal()).toEqual(10);
        controller.setPercent(25);
        expect(controller.getPercent()).toEqual(25);
      });
      it("percent should reflect total and value", function() {
        controller.setValue(5);
        controller.setTotal(10);
        expect(controller.getPercent()).toEqual(50);
      });
      it("total and value should disappear if you set percent", function() {
        controller.setValue(5);
        controller.setTotal(10);
        controller.setPercent(25);
        expect(controller.getPercent()).toEqual(25);
        expect(controller.getValue()).toBeNull();
        expect(controller.getTotal()).toBeNull();
      });
    });


  });


});
