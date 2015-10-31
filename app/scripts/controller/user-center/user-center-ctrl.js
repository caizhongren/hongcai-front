'use strict';
angular.module('hongcaiApp')
  .controller('UserCenterCtrl', ['$location', '$scope', '$state', '$rootScope', '$stateParams', 'UserCenterService', 'DEFAULT_DOMAIN', function($location, $scope, $state, $rootScope, $stateParams, UserCenterService, DEFAULT_DOMAIN) {
    $rootScope.selectPage = $location.path().split('/')[1];
    
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

    

    

  }]);
