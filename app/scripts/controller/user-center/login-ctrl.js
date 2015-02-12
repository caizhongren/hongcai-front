'use strict';
angular.module('hongcaiApp')
  .controller('LoginCtrl', ['$scope', '$location', '$state', '$rootScope', '$stateParams', 'LoginService', 'SessionService', 'ipCookie', 'md5', 'toaster', 'UserCenterService', function($scope, $location, $state, $rootScope, $stateParams, LoginService, SessionService, ipCookie, md5, toaster, UserCenterService) {

    if (ipCookie('userName')) {
      $scope.user = [];
      $scope.user.account = ipCookie('userName');
    }

    $scope.login = function(user) {
      //记住用户名处理
      if ($scope.rememberUserName) {
        ipCookie('userName', user.account, {
          expires: 60
        });
      }
      var password = md5.createHash(user.password);
      LoginService.userLogin.get({
        account: user.account,
        password: password
      }, function(response) {
        if (response.ret === 1) {
          SessionService.set('user', response.data.user.name);
          $rootScope.loginName = response.data.user.name;
          $rootScope.isLogged = true;
          $rootScope.securityStatus = response.data.securityStatus;
          toaster.pop('success', '恭喜您，登录成功！');
          UserCenterService.pushAllUnpullMessages.get(function(response) {
            if (response.ret === 1) {
              //console.info('pushmessage');
            }
          });
          if ($stateParams.redirectUrl) {
            $location.url($stateParams.redirectUrl);
          } else {
            $state.go('root.userCenter.account-overview');
          }
        } else {
          $scope.isPasswordError = true;
          if (response.code === -1009) {
            toaster.pop('error', response.msg);
          } else if (response.code === -1008) {
            toaster.pop('error', response.msg);
          }
        }
      });
    };

    $scope.$watch('user.password', function() {
      $scope.isPasswordError = false;
    });

    $scope.$watch('user.account', function() {
      $scope.isPasswordError = false;
    });

    $scope.logout = function() {
      SessionService.destory('user');
      $rootScope.loginName = '';
      $rootScope.isLogged = false;
      $state.go('root.login');
    };
    $scope.islogged = function() {
      if (SessionService.get('user')) {
        return true;
      }
    };

    angular.element('.dropdown').hover(function() {
      angular.element('#dropdown').css({
        'display': 'block'
      });
      angular.element('.dropdown .category').addClass('border-l-r');
    }, function() {
      angular.element('#dropdown').css({
        'display': 'none'
      });
      angular.element('.dropdown .category').removeClass('border-l-r');
    });

    /*angular.element('.dropdown').click(function(){
        angular.element('#dropdown').css({"display":"block"});
        angular.element('.dropdown .category').addClass('border-l-r');
    })*/
  }]);
