'use strict';
angular.module('hongcaiApp')
  .controller('RegisterMobileCtrl', function($scope, $state, $rootScope, $stateParams, RegisterService, SessionService, DEFAULT_DOMAIN, toaster, md5, ipCookie, MainService, UserCenterService) {
    $rootScope.pageTitle = '手机注册' + ' - 要理财，上宏财!';
    $scope.userbusiness = 0;
    /**
     * 注册链接上是否有邀请码
     */
    if ($stateParams.inviteCode) {
      $scope.user = {
        inviteCode: $stateParams.inviteCode
      };
    }

    if(ipCookie('registeInviteCode')){
      var cookiesInviteCode = ipCookie('registeInviteCode');
      $scope.user = {
        inviteCode: cookiesInviteCode
      };
    }

    $scope.submitRegisterMobile = function(user) {
      RegisterService.saveRegister.save({
        type: 0,
        picCaptcha: user.picCaptcha,
        account: user.mobile,
        captcha: user.mobileCaptcha,
        password: md5.createHash(user.password),
        inviteCode: user.inviteCode,
        from: ipCookie('utm_from'),
        act: ipCookie('act')
      }, function(response) {
        if (response.ret === 1) {
          SessionService.set('user', response.data.user.name);
          $state.go('root.register-mobile-success');
        } else {
          toaster.pop('warning', '提示', response.msg);
          $state.go('root.register');
        }
      });
    };



    $scope.getPicCaptcha = DEFAULT_DOMAIN + '/siteUser/getPicCaptcha?';
    $scope.refreshCode = function() {
      angular.element('#checkCaptcha').attr('src', angular.element('#checkCaptcha').attr('src').substr(0, angular.element('#checkCaptcha').attr('src').indexOf('?')) + '?code=' + Math.random());
    };



    /**
     * 处理推广流量
     * @type {[type]}
     */
    var from = $stateParams.from;
    if (from) {
      ipCookie('utm_from', from, {
        expires: 1
      });
      MainService.trafficStats.get({
        from: from
      });
    }
  });
