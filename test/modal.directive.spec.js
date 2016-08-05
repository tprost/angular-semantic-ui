describe('ui.modal', function() {

  var $compile,
      $rootScope,
      $animate;

  var testApp;

  beforeEach(function() {
    testApp = angular.module('testApp', ['ui.modal', 'ngAnimateMock']);
    angular.mock.module('testApp');
  });

  beforeEach(inject(function(_$compile_, _$rootScope_, _$animate_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $animate = _$animate_;
  }));

  describe('modal directive', function() {

    it('opens and closes', function() {
      var modal = $compile('<div class="ui modal"><p>Test paragraph.</p></div>')($rootScope);

      $rootScope.$digest();

      var controller = modal.controller('modal');

      controller.show();
      $rootScope.$digest();
      expect(modal.hasClass('visible')).toEqual(true);
      $animate.flush();
      $rootScope.$digest();
      expect(modal.hasClass('active')).toEqual(true);

    });

    describe ('clicking on the dimmer', function() {

      it ('closes the modal if setting is set', function() {

        var modal = $compile('<div class="ui modal"><p>Test paragraph.</p></div>')($rootScope);

        $rootScope.$digest();

        var controller = modal.controller('modal');
        controller.settings.closable = false;

        controller.show();
        $animate.flush();
        $rootScope.$digest();

        var dimmer = modal.parent();
        dimmer.triggerHandler('click');

        expect(modal.hasClass('visible')).toEqual(true);
        expect(modal.hasClass('active')).toEqual(true);

        controller.settings.closable = true;

        dimmer.triggerHandler('click');

        expect(modal.hasClass('active')).toEqual(false);
        $animate.flush();
        expect(modal.hasClass('visible')).toEqual(false);

      });

    });

  });


});
