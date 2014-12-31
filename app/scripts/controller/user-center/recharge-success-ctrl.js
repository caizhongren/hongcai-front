'use strict';
hongcaiApp.controller('RechargeSuccessCtrl', ['$scope', '$http', 'analytics', function ($scope, $http, analytics) {
    $scope.page = 4;
    console.log('page:' + $scope.page);
    // $scope.counter = 5;
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

