'use strict';
hongcaiApp.controller('BankcardSuccessCtrl', ['$scope', '$timeout', '$state', '$rootScope', '$stateParams', 'RegisterService', 'SessionService', 'DEFAULT_DOMAIN', 'toaster', function ($scope, $timeout, $state, $rootScope, $stateParams, RegisterService, SessionService, DEFAULT_DOMAIN, toaster) {
    $scope.page = 5;
    $scope.counter = 10;
    // $scope.onTimeout = function(){
    //   $scope.counter--;
    //   mytimeout = $timeout($scope.onTimeout,1000);
    //   if($scope.counter === 0) {
    //     window.location.href = '/account-overview';
    //   }
    // }
    // var mytimeout = $timeout($scope.onTimeout,1000);
    // $scope.$on('$stateChangeStart', function(){
    //   $timeout.cancel(mytimeout);
    // });
}]);

