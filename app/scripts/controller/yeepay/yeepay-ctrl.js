hongcaiApp.controller("YeepayCtrl", ["$scope", "$state", "$rootScope", "$stateParams", "YeepayService", function ($scope, $state, $rootScope, $stateParams, YeepayService) {
   
   $scope.yeepayServiceName = $stateParams.yeepayService;
   $scope.yeepayCallBackStatus = $stateParams.yeepayStatus;


}]);
