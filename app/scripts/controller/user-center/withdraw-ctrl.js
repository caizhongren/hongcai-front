'use strict';
angular.module('hongcaiApp')
  .controller('WithdrawCtrl', function($location, $scope, $state, $rootScope, $stateParams, UserCenterService, DEFAULT_DOMAIN, $alert, $modal, DateUtils) {
    //法定节假日
    var Holiday = ['2017-04-29', '2017-04-30', '2017-05-01', '2017-05-28', '2017-05-29', '2017-05-30', '2017-10-01', '2017-10-02', '2017-10-03', '2017-10-04', '2017-10-05', '2017-10-06', '2017-10-07', '2017-10-08'];
    //法定节假日调休
    var WeekendsOff = ['2017-05-27', '2017-09-30'];
    //当前时间
    var currentDate = new Date();
    // var nextDay = currentDate.setDate(currentDate.getDate() + 1);
    $scope.nextDay = DateUtils.withdrawArriveDate(currentDate,Holiday,WeekendsOff);

    $scope.availableCash = 0;

    // 可提现金额查询
    UserCenterService.availableCash.get({}, function(response) {
      if (response && response.ret !== 1) {
        $scope.availableCash = response.account.availableCash;
        var cash = Math.floor($scope.availableCash * 100)/100;
        var withdrawFee = response.withdrawFee; // 提现手续费
        $scope.cardStatus = response.cardStatus;
        $scope.availableCashRealNo = cash >= withdrawFee ? cash - withdrawFee : 0;
      }
    });
    // 本月可免费提现次数查询
    UserCenterService.freeWithdrawCount.get({}, function(response) {
      if (response && response.ret !== 1) {
        $scope.freeWithdrawCount = response.freeWithdrawCount; // 免费提现次数
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
      // $rootScope.toNotice();
      var act = function() {
        if($scope.checkMinAmount(amount) || $scope.checkLargestAmount(amount) || amount ===''){
          return;
        }
        if($rootScope.pay_company == 'cgt' && $rootScope.securityStatus.userAuth.active === false) {
          $rootScope.migrateStatus();
        } else {
          $scope.msg = '3';
          $scope.withdrawAmount = amount;
          $alert({
            scope: $scope,
            template: 'views/modal/alertYEEPAY.html',
            show: true
          });

          window.open('/#!/withdraw-transfer/' + amount + '/' + captcha);
        }
      }
      $rootScope.migrateStatus(act);

    };
    
    
    

  });
