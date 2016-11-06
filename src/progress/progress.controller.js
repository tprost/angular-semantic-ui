/**
 * @ngdoc controller
 * @name ProgressController
 * @module ui.progress
 * @description
 * Controller used by the `progress` directive.
 *
 **/
angular.module('ui.progress').controller('ProgressController', function() {

  var vm = this;

  // progress bar can use either a percentage value or a
  // value and a totalp
  var value, total, percent = null;
value = null;
total = null;
percent = null;
  vm.setValue = setValue;
  vm.setTotal = setTotal;
  vm.setPercent = setPercent;
  vm.getValue = getValue;
  vm.getTotal = getTotal;
  vm.getPercent = getPercent;

  function setValue(_value_) {
    percent = null;
    value = _value_;
  };

  function setTotal(_total_) {
    percent = null;
    total = _total_;
  };

  function setPercent(_percent_) {
    total = null;
    value = null;
    percent = _percent_;
  };

  function getValue() {
    return value;
  };

  function getTotal() {
    return total;
  };

  function getPercent() {
    if (percent === null) {
      if (total === null && value === null) {
        return null;
      }
      return 100 * value / total;
    }
    return percent;
  };

});
