'use strict';
hongcaiApp.controller('WithdrawSuccessCtrl', ['$scope', '$timeout', '$state', '$rootScope', '$stateParams', 'RegisterService', 'SessionService', 'DEFAULT_DOMAIN', 'toaster', function ($scope, $timeout, $state, $rootScope, $stateParams, RegisterService, SessionService, DEFAULT_DOMAIN, toaster) {
    $scope.page = 6;
    $scope.counter = 5;
    $scope.onTimeout = function(){
      $scope.counter--;
      mytimeout = $timeout($scope.onTimeout,1000);
      if($scope.counter === 0) {
        window.location.href = '/account-overview';
      }
    }
    var mytimeout = $timeout($scope.onTimeout,1000);
    $scope.$on('$stateChangeStart', function(){
      $timeout.cancel(mytimeout);
    });
}]);

