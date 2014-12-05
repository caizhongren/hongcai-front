'use strict';
hongcaiApp.controller('RegisterMobileSuccessCtrl', ['$scope', '$timeout', '$state', '$rootScope', '$stateParams', 'RegisterService', 'SessionService', 'DEFAULT_DOMAIN', 'toaster', '$location', function ($scope, $timeout, $state, $rootScope, $stateParams, RegisterService, SessionService, DEFAULT_DOMAIN, toaster, $location) {
    $scope.page = 3;
    $scope.counter = 5;
    $scope.onTimeout = function(){
      $scope.counter--;
      mytimeout = $timeout($scope.onTimeout,1000);
      if($scope.counter === 0) {
        $state.go('root.userCenter.security-settings');
      }
    }
    var mytimeout = $timeout($scope.onTimeout,1000);
    $scope.$on('$stateChangeStart', function(){
      $timeout.cancel(mytimeout);
    });
}]);