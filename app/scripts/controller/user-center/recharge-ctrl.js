'use strict';
angular.module('hongcaiApp')
  .controller('RechargeCtrl',  function($location, $scope, toaster, $state, $rootScope, $stateParams, UserCenterService, DEFAULT_DOMAIN, config, $alert) {
    $scope.balance = 0;
    UserCenterService.getUserBalance.get({}, function(response) {
      if (response.ret === 1) {
        $scope.balance = response.data.balance;
      } else {
        console.log('ask recharge, why getUserBalance did not load data...');
      }
    });

    $scope.getPicCaptcha = DEFAULT_DOMAIN + '/siteUser/getPicCaptcha?' + Math.random();
    $scope.refreshCode = function() {
      angular.element('#checkCaptcha').attr('src', angular.element('#checkCaptcha').attr('src').substr(0, angular.element('#checkCaptcha').attr('src').indexOf('?')) + '?code=' + Math.random());
    };


    $scope.transferToPlaform = function(amount) {
      $scope.msg = '8';
      $scope.transferAmount = amount;
      $alert({
        scope: $scope,
        template: 'views/modal/alertYEEPAY.html',
        show: true
      });
      window.open('/#!/transfer-transfer/' + amount);
    };

    $scope.recharge = function(amount) {
      $scope.msg = '2';
      $scope.rechargeAmount = amount;
      $alert({
        scope: $scope,
        template: 'views/modal/alertYEEPAY.html',
        show: true
      });
      window.open('/#!/recharge-transfer/' + amount);
    };
  });
