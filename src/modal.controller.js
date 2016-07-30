/**
 * @ngdoc controller
 * @name ui.modal.controller:ModalController
 * @description
 * The controller for a `modal` element.
 *
 **/
angular.module('ui.modal').controller('ModalController', function($document, $element, $scope, $compile, $animateCss, $q, $animate, $controller) {

  var vm = this;
  var active, visible, animatingIn, animatingOut;
  var $parent;

  vm.is = {
    active: isActive,
    visible: isVisible,
    animating: isAnimating,
    animatingIn: isAnimatingIn,
    animatingOut: isAnimatingOut,
    dimmerVisible: isDimmerVisible
  };

  vm.set = {
    active: setActive
  };

  vm.remove = {
    visible: removeVisible
  };

  vm.hide = hide;
  vm.show = show;
  vm.toggle = toggle;

  vm.refresh = refresh;

  vm.get = {
    dimmer: getDimmer,
    modal: getModal
  };

  vm.showDimmer = showDimmer;
  vm.hideDimmer = hideDimmer;

  var $dimmer, dimmableController;

  vm.settings = {

  };

  /**
   * @ngdoc
   * @name ui.modal.controller:ModalController#show
   * @methodOf ui.modal.controller:ModalController
   *
   * @description
   * Show the modal.
   */
  function show() {
    visible = true;
    if (!active) animatingIn = true;
    animatingOut = false;
  };

  /**
   * @ngdoc
   * @name ui.modal.controller:ModalController#hide
   * @methodOf ui.modal.controller:ModalController
   *
   * @description
   * Hide the modal.
   */
  function hide() {
    active = false;
    animatingIn = false;
    if (visible) animatingOut = true;
  };

  function toggle() {
    vm.is.active() ? vm.hide() : vm.show();
  };

  function getDimmer() {
    return $dimmer;
  };

  function getModal() {
    return $element;
  };

  function isActive() {
    return active;
  };

  function isAnimating() {
    return animatingIn || animatingOut;
  };

  function isAnimatingIn() {
    return animatingIn;
  };

  function isAnimatingOut() {
    return animatingOut;
  };

  function isVisible() {
    return visible;
  };

  function setVisible() {
    visible = true;
  };

  function setActive() {
    animatingIn = false;
    animatingOut = false;
    visible = true;
    active = true;
  };

  function removeVisible() {
    animatingOut = false;
    animatingIn = false;
    visible = false;
  };

  function removeActive() {
    active = false;
  };

  function createDimmer() {
    var $dimmable = angular.element('<div class="ui dimmable"></div>');
    var $body = angular.element($document.find('body'));
    $body.addClass('dimmable');
    $body.addClass('dimmed');
    $compile($dimmable)($scope);
    dimmableController = $dimmable.controller('dimmable');
    $dimmer = angular.element($dimmable.children()[0]);
    $body.append($dimmer);
    $dimmer.controller('dimmer').set.dimmable($body);
    $dimmer.bind('click', function() {
      $scope.$apply(function() {
        vm.hide();
      });
    });
    $dimmer.append($element);

    return $dimmer;
  };

  function showDimmer() {
    if (!$dimmer) createDimmer();
    return dimmableController.show();
  };

  function hideDimmer() {
    if ($dimmer) return dimmableController.hide();
    return true;
  };

  function isDimmerVisible() {
    return dimmableController ? dimmableController.is.visible() : false;
  };

  function refresh() {
    $element.css('margin-top', '-' + $element[0].offsetHeight / 2 + 'px');
  };


  active = $element.hasClass('active');
  visible = $element.hasClass('visible');
  // original parent of the modal
  $parent = angular.element($element.parent());

  $element.addClass('transition');

  this.$doCheck = function() {
    if (!visible && !active) {
      if ($parent) {
        $parent.append($element);
      } else {
        $element.remove();
      }
      if ($dimmer) {
        $dimmer.remove();
        $dimmer = null;
        dimmableController = null;
      }
    }
  };



});
