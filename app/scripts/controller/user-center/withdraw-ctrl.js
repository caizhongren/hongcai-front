'use strict';
angular.module('hongcaiApp')
  .controller('WithdrawCtrl', ['$location', '$scope', '$state', '$rootScope', '$stateParams', 'UserCenterService', 'DEFAULT_DOMAIN', '$alert', function($location, $scope, $state, $rootScope, $stateParams, UserCenterService, DEFAULT_DOMAIN, $alert) {

    $rootScope.selectSide = $location.path().substr($location.path().indexOf('/') + 1);
    $scope.availableCash = 0;
    UserCenterService.getUserAvailableCash.get({}, function(response) {
      if (response.ret === 1) {
        $scope.availableCash = response.data.availableCash;
        $scope.availableCashRealNo = $scope.availableCash >= 2 ? $scope.availableCash - 2 : 0;
      } else {
        console.log('ask withdraw, why getUserAvailableCash did not load data...');
      }
    });
    $scope.checkLargestAmount = function(amount) {
      if (amount >= $scope.availableCashRealNo) {
        return true;
      } else {
        return false;
      }
    };

    $scope.getPicCaptcha = DEFAULT_DOMAIN + '/siteUser/getPicCaptcha?' + Math.random();
    $scope.refreshCode = function() {
      angular.element('#checkCaptcha').attr('src', angular.element('#checkCaptcha').attr('src').substr(0, angular.element('#checkCaptcha').attr('src').indexOf('?')) + '?code=' + Math.random());
    };

    $scope.reload = function() {
      window.location.reload();
    };

    $scope.withdraw = function(amount, captcha) {
      $scope.msg = '3';
      $scope.withdrawAmount = amount;
      $alert({
        scope: $scope,
        template: 'views/modal/alertYEEPAY.html',
        show: true
      });

      window.open('/withdraw-transfer/' + amount + '/' + captcha);

      /*UserCenterService.yeepayWithdraw.get({
        amount: amount,
        captcha: captcha
      }, function(response) {
        if (response.ret === 1) {
          var req = response.data.req;
          var sign = response.data.sign;
          var _f = newForm();
          createElements(_f, 'req', req);
          createElements(_f, 'sign', sign);
          _f.action = config.YEEPAY_ADDRESS + 'toWithdraw';
          _f.submit();
        } else if (response.ret === -1) {
          $scope.msg = response.msg;
          $alert({scope: $scope, template: 'views/modal/alert-dialog.html', show: true});
        } else {
          console.log('ask withdraw, why yeepayWithdraw did not load data...');
        }
      });*/
    };
  }]);
