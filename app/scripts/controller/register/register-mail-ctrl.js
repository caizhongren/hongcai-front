'use strict';
angular.module('hongcaiApp')
  .controller('RegisterMailCtrl', ['$scope', '$state', '$rootScope', '$stateParams', 'RegisterService', 'SessionService', 'DEFAULT_DOMAIN', 'toaster', 'md5', 'ipCookie', function($scope, $state, $rootScope, $stateParams, RegisterService, SessionService, DEFAULT_DOMAIN, toaster, md5, ipCookie) {
    /**
     * 注册链接上是否有邀请码
     */
    if ($stateParams.inviteCode) {
      $scope.user = {
        inviteCode: $stateParams.inviteCode
      };
    }

    $scope.submitRegisterMail = function(user) {
      RegisterService.saveRegister.save({
        name: user.name,
        type: 1,
        account: user.email,
        password: md5.createHash(user.password),
        captcha: user.captcha,
        inviteCode: user.inviteCode,
        from: ipCookie('utm_from')
      }, function(response) {
        console.log(response.ret);
        if (response.ret === 1) {
          SessionService.set('user', response.data.user.name);
          $state.go('root.send-email');
          //$rootScope.loginName = response.data.user.name;
          //$rootScope.isLogged = true;
        } else {
          toaster.pop('warning', '提示', response.msg);
          $state.go('root.registerMail');
        }
      });
    };

    $scope.getPicCaptcha = DEFAULT_DOMAIN + '/siteUser/getPicCaptcha?';
    $scope.refreshCode = function() {
      angular.element('#checkCaptcha').attr('src', angular.element('#checkCaptcha').attr('src').substr(0, angular.element('#checkCaptcha').attr('src').indexOf('?')) + '?code=' + Math.random());
    };

  }]);
