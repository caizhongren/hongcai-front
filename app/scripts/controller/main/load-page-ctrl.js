'use strict';
angular.module('hongcaiApp')
  .controller('LoadPageCtrl', ['$scope', '$state', '$rootScope', '$stateParams', 'RegisterService', 'SessionService', 'DEFAULT_DOMAIN', 'toaster', 'md5', 'ipCookie', 'MainService', function($scope, $state, $rootScope, $stateParams, RegisterService, SessionService, DEFAULT_DOMAIN, toaster, md5, ipCookie, MainService) {
    // var lpdialoag = $('#lpdialog');
    var lpclose = $('#lpclose');
    lpclose.click(function() {
      $('#aadialog').fadeOut(200);
    });


    $scope.backtop = function() {
      $('html,body').animate({
        scrollTop: '0px'
      }, 300);
    };

    $scope.submitRegisterMobile = function(user) {
      RegisterService.saveRegister.save({
        name: user.name,
        type: 0,
        account: user.mobile,
        captcha: user.mobileCaptcha,
        password: md5.createHash(user.password),
        inviteCode: user.inviteCode,
        from: ipCookie('utm_from')
      }, function(response) {
        if (response.ret === 1) {
          SessionService.set('user', response.data.user.name);
          $state.go('root.register-mobile-success');
          //$rootScope.loginName = response.data.user.name;
          //$rootScope.isLogged = true;
        } else {
          toaster.pop('warning', '提示', response.msg);
          $state.go('root.registerMobile');
        }
      });
    };

    $scope.sendMobileCaptcha = function() {
      RegisterService.sendMobileCaptcha.save({
        mobile: angular.element('#mobile').val()
      }, function(response) {
        if (response.ret === 1) {

        } else {

        }
      });
    };
    // $scope.online = online;
    //360渠道流量统计
    var from = $stateParams.from;
    if (from) {
      ipCookie('utm_from', from, {
        expires: 1
      });
      MainService.trafficStats.get({
        from: from
      });
    }

  }]);
