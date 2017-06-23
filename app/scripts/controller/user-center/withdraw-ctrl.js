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
    UserCenterService.getUserAvailableCash.get({}, function(response) {
      // console.log(response);
      if (response.ret === 1) {
        $scope.availableCash = response.data.availableCash;
        var cash = Math.floor($scope.availableCash * 100)/100;

        $scope.cardStatus = response.data.cardStatus;
        $scope.availableCashRealNo = cash >= 2 ? cash - 2 : 0;
      } else {
        //console.log('ask withdraw, why getUserAvailableCash did not load data...');
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
