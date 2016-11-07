describe('progress directive', function() {

  var $compile,
      $rootScope,
      $animate;

  var testApp;

  beforeEach(function() {
    testApp = angular.module('testApp', ['ui.progress', 'ngAnimateMock']);
    angular.mock.module('testApp');
  });

  beforeEach(inject(function(_$compile_, _$rootScope_, _$animate_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $animate = _$animate_;
  }));

  var uiProgress, bar, progress, label;

  function makeProgressElement() {
    uiProgress = angular.element('<div class="ui progress"></div>');
    bar = angular.element('<div class="bar"></div>');
    progress = angular.element('<div class="progress"></div>');
    label = angular.element('<div class="label"></div>');
    bar.append(progress);
    uiProgress.append(bar);
    uiProgress.append(label);
    return uiProgress;
  };

  beforeEach(function() {
    makeProgressElement();
  });

  it('sets width style on bar', function() {
    uiProgress.attr('data-total', 10);
    uiProgress.attr('data-value', 3);
    $compile(uiProgress)($rootScope);
    $rootScope.$digest();
    var controller = uiProgress.controller('progress');
    expect(bar.attr('style')).toEqual('width: 30%;');
  });

  it('sets progress to the percentage if you use total and value', function() {
    uiProgress.attr('data-total', 10);
    uiProgress.attr('data-value', 3);
    $compile(uiProgress)($rootScope);
    $rootScope.$digest();
    expect(progress.html()).toContain('30%');
  });

  it('sets progress to the percentage if you use percent', function() {
    uiProgress.attr('data-percent', 77);
    $compile(uiProgress)($rootScope);
    $rootScope.$digest();
    expect(progress.html()).toContain('77%');
  });

  it('progress percentage should round to 1 decimal', function() {
    uiProgress.attr('data-total', 3);
    uiProgress.attr('data-value', 1);
    $compile(uiProgress)($rootScope);
    $rootScope.$digest();
    expect(progress.html()).toContain('33.3%');
  });

  it('should display percentages over 100% as 100%', function() {
    uiProgress.attr('data-percent', 110);
    $compile(uiProgress)($rootScope);
    $rootScope.$digest();
    expect(bar.attr('style')).toEqual('width: 100%;');
    expect(progress.html()).toContain('100%');
  });

  it('should be able to use Angular expressions', function() {
    $rootScope.total = 10;
    $rootScope.value = 6;
    uiProgress.attr('data-value', 'value');
    uiProgress.attr('data-total', 'total');
    $compile(uiProgress)($rootScope);
    $rootScope.$digest();
    expect(bar.attr('style')).toEqual('width: 60%;');
    expect(progress.html()).toContain('60%');
    $rootScope.value = 2;
    $rootScope.$digest();
    expect(bar.attr('style')).toEqual('width: 20%;');
    expect(progress.html()).toContain('20%');
  });

});
