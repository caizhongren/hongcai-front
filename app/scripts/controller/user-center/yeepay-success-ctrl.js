'use strict';
hongcaiApp.controller('YeepaySuccessCtrl', ["$scope", "$state", '$timeout', "$rootScope", "$stateParams", "RegisterService", "SessionService", "DEFAULT_DOMAIN", "toaster", function ($scope, $state, $timeout, $rootScope, $stateParams, RegisterService, SessionService, DEFAULT_DOMAIN, toaster) {
  $scope.page = 1;

  // $scope.counter = 5;
  //   $scope.onTimeout = function(){
  //     $scope.counter--;
  //     mytimeout = $timeout($scope.onTimeout,1000);
  //     if($scope.counter === 0) {
  //       $state.go('root.userCenter.security-settings');
  //     }
  //   }
  //   var mytimeout = $timeout($scope.onTimeout,1000);
  //   $scope.$on('$stateChangeStart', function(){
  //     $timeout.cancel(mytimeout);
  //   });
}]);
 