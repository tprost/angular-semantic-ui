angular.module('pathgather.popeye').controller('ModalController', function($document) {

  this.show = function() {
    this.modal.addClass('active visible');
    var body, bodyLastChild, dimmer;
    body = angular.element($document.find('body'));
    body.addClass('dimmable dimmed');
    dimmer = angular.element('<div class="ui dimmer active visible"></div>');
    body.append(dimmer);
    dimmer.append(this.modal);
  };

  this.hide = function() {
    this.modal.removeClass('active visible');
  };

});

angular.module('pathgather.popeye').directive('modal', function() {
  return {
    restrict: 'C',
    controller: 'ModalController',
    link: function(scope, elem, attrs, ctrl) {
      if (elem.hasClass('ui')) {
        ctrl.modal = elem;
        elem.show = ctrl.show;
        elem.hide = ctrl.hide;
      }
    }
  };
});
