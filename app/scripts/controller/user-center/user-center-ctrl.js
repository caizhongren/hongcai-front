'use strict';
angular.module('hongcaiApp')
  .controller('UserCenterCtrl', function($location, $scope, $state, $rootScope, $stateParams, UserCenterService, DEFAULT_DOMAIN) {
    $rootScope.selectPage = $location.path().split('/')[2];
    var timestamp = new Date();
    var welcomeTime = timestamp.getHours();
    if (welcomeTime > 5 && welcomeTime < 9) {
      $scope.welcomeTip = '早安~';
    } else if (welcomeTime >= 9 && welcomeTime <= 11) {
      $scope.welcomeTip = '上午好~';
    } else if (welcomeTime >= 12 && welcomeTime <= 14) {
      $scope.welcomeTip = '中午好~';
    } else if (welcomeTime >= 15 && welcomeTime <= 18) {
      $scope.welcomeTip = '下午好~';
    } else {
      $scope.welcomeTip = '晚安~';
    }

    if(['record', 'assets-overview', 'recharge', 'withdraw'].indexOf($rootScope.selectPage) !== -1){
      // $('#accountInfo').collapse('toggle')
      $('#capitalInfo').addClass('in');
    } else if (['credit', 'investment', 'reservation', 'assignments'].indexOf($rootScope.selectPage) !== -1){
      $('#investInfo').addClass('in');
    } else if (['experienceMoney', 'rate-coupon', 'invite-rebate','cash-coupon'].indexOf($rootScope.selectPage) !== -1){
      $('#rewardInfo').addClass('in');
    } else if (['message'].indexOf($rootScope.selectPage) !== -1){
      $('#sysInfo').addClass('in');
    } else {
      $('#accountInfo').addClass('in');
    }

    /**
    * 账号信息
    **/
    UserCenterService.userSecurityInfo.get({}, function(response) {
      if (response && response.ret !== -1) {
        var userAuth = response.data.userAuth;
        var user = response.data.user;
        $scope.email = user.email;
        $scope.mobile = user.mobile;
        $scope.userId = user.id;
        if (userAuth && userAuth.yeepayAccountStatus === 1) {
          $scope.haveTrusteeshipAccount = true;
          // $scope.openTrustReservation = userAuth.autoTransfer;
        } else {
          $scope.haveTrusteeshipAccount = false;
        }

      } 
    });
    /**
    * 绑卡信息
    **/
    UserCenterService.getUserBankCard.get({}, function(response) {
      if (response.ret === 1) {
        var card = response.data.card;
        if (card) {
          $scope.haveCard = (card.status === 'VERIFIED');
          $scope.isVerifying = (card.status === 'VERIFYING');
          $scope.unbinding = (card.status === 'INIT');
        } else {
          $scope.haveCard = false;
        }
        $scope.isAuth = response.data.isAuth;
      } else {
        toaster.pop('error', response.msg);
      }
    });




  });
