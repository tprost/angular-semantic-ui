angular.module('ui.dimmer').controller('DimmerController', function($animateCss, $element, $scope) {

  var vm = this;

  vm.is = {
    active: isActive,
    animating: isAnimating
  };

  vm.get = {
    dimmer: getDimmer,
    duration: getDuration
  };
  vm.set = {
    active: setActive,
    dimmed: setDimmed,
    dimmable: setDimmable
  };
  vm.remove = {
    active: removeActive,
    dimmed: removeDimmed,
    dimmable: removeDimmable
  };
  vm.show = show;
  vm.hide = hide;
  vm.toggle = toggle;

  var $dimmable = angular.element($element.parent());
  var $dimmer = $element;

  function getDimmer() {
    return $element;
  };

  function getDuration() {
    // TODO
  };

  function hide() {
    var promise = $animateCss($element, {
      addClass: 'animating fade out'
    }).start().then(function() {
      vm.remove.active();
      $element.removeClass('visible active animating fade out');
      vm.remove.dimmed();
    });
    $scope.$digest();
    return promise;
  };

  function isActive() {
    return $dimmer.hasClass('active');
  };
  function isAnimating() {
    // TODO
  };



  function removeActive() {
    $dimmer.removeClass('active');
  };

  function removeDimmable() {
    $dimmable.removeClass('dimmable');
  };

  function removeDimmed() {
    $dimmable.removeClass('dimmed');
  };

  function setActive() {
    $dimmer.addClass('active');
  };

  function setDimmable() {
    $dimmable.addClass('dimmable');
  };

  function setDimmed() {
    $dimmable.addClass('dimmed');
  };

  function show() {
    $element.attr('ng-animate-children', true);
    vm.set.dimmed();
    var promise = $animateCss($element, {
      addClass: 'visible animating fade in'
    }).start().then(function() {
      vm.set.active();
      $element.removeClass('animating fade in');
    });
    $scope.$digest();
    return promise;
  };

  function toggle() {
    vm.is.active() ? vm.hide() : vm.show();
  };


  $dimmer.addClass('transition');

  var transition = 'fade';

});
