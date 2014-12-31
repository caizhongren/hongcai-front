'use strict';
hongcaiApp.controller('YeepayCtrl', ['$scope', '$state', '$rootScope', '$stateParams', 'YeepayService', '$http', 'analytics', function ($scope, $state, $rootScope, $stateParams, YeepayService, $http, analytics) {
   $scope.yeepayServiceName = $stateParams.yeepayService;
   $scope.yeepayCallBackStatus = $stateParams.yeepayStatus;


}]);
