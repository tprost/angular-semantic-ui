angular.module('ui.dimmer', ['ngAnimate']);

angular.module('ui.dimmer').controller('DimmableController', function($element) {

  this.$element = angular.element($element);

});

angular.module('ui.dimmer').controller('DimmerController', function($animate, $element, $scope) {

  this.$element = angular.element($element);
  var $dimmable = angular.element($element.parent());
  var $dimmer = this.$element;

  $dimmer.addClass('transition');

  var transition = 'fade';
  var ctrl = this;

  this.$setDimmable = function(dimmableController) {
    $dimmable = dimmableController.$element;
  };

  this.is = {
    active: function() {
      return $dimmer.hasClass('active');
    }
  };

  this.set = {
    active: function() {
      $dimmer.addClass('active');
    },
    dimmable: function() {
      $dimmable.addClass('dimmable');
    },
    dimmed: function() {
      $dimmable.addClass('dimmed');
    }
  };

  this.remove = {
    active: function() {
      $dimmer.removeClass('active');
    },
    dimmable: function() {
      $dimmable.removeClass('dimmable');
    },
    dimmed: function() {
      $dimmable.removeClass('dimmed');
    }
  };

  this.show = function() {

    this.set.dimmed();
    var animation = $animate.addClass($element, 'visible animating fade in');

    animation.then(function() {
      ctrl.set.active();
      $element.removeClass('animating fade in');
    });
    $scope.$digest();
    return animation;
  };

  this.hide = function() {

    var animation = $animate.addClass($element, 'animating fade out');
    animation.then(function() {

      ctrl.remove.active();
      $element.removeClass('visible active animating fade out');
      this.remove.dimmed();
    });
    $scope.$digest();
    return animation;
  };

  this.toggle = function() {
    this.is.active() ? this.hide() : this.show();
  };

});

angular.module('ui.dimmer').directive('dimmable', function() {
  return {
    restrict: 'C',
    controller: 'DimmableController',
    link: function(scope, elem, attrs, ctrl) {

    }
  };
});

angular.module('ui.dimmer').directive('dimmer', function() {
  return {
    restrict: 'C',
    require: '?^dimmable',
    controller: 'DimmerController',
    link: function(scope, elem, attrs, ctrl) {
      if (ctrl[1]) ctrl[0].$setDimmable(ctrl[1]);
    }
  };
});
