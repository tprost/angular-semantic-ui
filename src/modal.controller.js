angular.module('ui.modal').controller('ModalController', function($document, $element, $scope, $compile, $animateCss) {

  var vm = this;

  vm.is = {
    active: isActive
  };

  vm.hide = hide;
  vm.show = show;
  vm.toggle = toggle;

  var $dimmer;
  // original parent of the modal
  var $parent = angular.element($element.parent());

  $element.addClass('transition');

  function show() {

    var body, bodyLastChild;
    body = angular.element($document.find('body'));
    body.addClass('dimmable dimmed');
    $dimmer = angular.element('<div class="ui dimmer transition active visible"></div>');
    $compile($dimmer)($scope);
    $dimmer.controller('dimmer').set.dimmable(body);

    $dimmer.bind('click', function(e) {
      vm.hide();
    });

    body.append($dimmer);
    $dimmer.append($element);

    $dimmer.controller('dimmer').show().then(function() {

    });

    $element.addClass('visible');

    $animateCss($element, {
      addClass: 'animating scale in'
    }).start().then(function() {
      $element.addClass('active');
      $element.removeClass('animating scale in');
    });

    //    $element.addClass('animating scale in');
  };


  function hide() {

    $animateCss($element, {
      addClass: 'animating fade out'
    }).start().then(function() {
      $parent.append($element);
      $element.removeClass('active visible animating fade out');
    });

    $dimmer.controller('dimmer').hide().then(function() {
      $dimmer.remove();
    });

  };

  function isActive() {
    return $element.hasClass('active');
  };

  function toggle() {
    vm.is.active() ? vm.hide() : vm.show();
  };

});
