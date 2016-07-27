angular.module('ui.modal').controller('ModalController', function($document, $element, $scope, $compile, $animate) {

  var controller = this;
  var $dimmer;
  // original parent of the modal
  var parent;

  $element.addClass('transition');

  this.show = function() {
    $element.addClass('visible');


    var body, bodyLastChild;
    body = angular.element($document.find('body'));
    body.addClass('dimmable dimmed');
    $dimmer = angular.element('<div class="ui dimmer transition active visible"></div>');
    $compile($dimmer)($scope);
    $dimmer.controller('dimmer').$setDimmable(body);

    $dimmer.bind('click', function(e) {
      controller.hide();
    });

    body.append($dimmer);
    $dimmer.append(this.modal);

    $dimmer.controller('dimmer').show().then(function() {

    });

    $animate.addClass($element, 'animating fade in').then(function() {
      $element.addClass('active');
    });


  };

  this.hide = function() {

    $animate.addClass($element, 'animating fade out').then(function() {
      parent.append(this.modal);
      this.modal.removeClass('active visible');
    });



    $dimmer.controller('dimmer').hide().then(function() {
      $dimmer.remove();
    });

  };

});

angular.module('ui.modal').directive('modal', function() {
  return {
    restrict: 'C',
    controller: 'ModalController',
    link: function(scope, elem, attrs, ctrl) {

    }
  };
});
