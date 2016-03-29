'use strict';
angular.module('hongcaiApp')
  .controller('WithdrawCtrl', function($location, $scope, $state, $rootScope, $stateParams, UserCenterService, DEFAULT_DOMAIN, $alert) {
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    $scope.nextDay = currentDate;

    $rootScope.selectSide = $location.path().substr($location.path().indexOf('/') + 1);
    $scope.availableCash = 0;
    UserCenterService.getUserAvailableCash.get({}, function(response) {
      // console.log(response);
      if (response.ret === 1) {
        $scope.availableCash = response.data.availableCash;
        $scope.cardStatus = response.data.cardStatus;
        $scope.availableCashRealNo = $scope.availableCash >= 2 ? $scope.availableCash - 2 : 0;
      } else {
        console.log('ask withdraw, why getUserAvailableCash did not load data...');
      }
    });
    
    $scope.checkLargestAmount = function(amount) {
        return amount > $scope.availableCashRealNo;
    };

    $scope.checkMinAmount = function(amount){
      return amount < 1;
    }

    $scope.getPicCaptcha = DEFAULT_DOMAIN + '/siteUser/getPicCaptcha?' + Math.random();
    $scope.refreshCode = function() {
      angular.element('#checkCaptcha').attr('src', angular.element('#checkCaptcha').attr('src').substr(0, angular.element('#checkCaptcha').attr('src').indexOf('?')) + '?code=' + Math.random());
    };


    $scope.withdraw = function(amount, captcha) {
      $scope.msg = '3';
      $scope.withdrawAmount = amount;
      $alert({
        scope: $scope,
        template: 'views/modal/alertYEEPAY.html',
        show: true
      });

      window.open('/#!/withdraw-transfer/' + amount + '/' + captcha);

    };

  });
