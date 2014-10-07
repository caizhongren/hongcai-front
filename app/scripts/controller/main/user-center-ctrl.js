define(['scripts/app', 'ngload!scripts/service/main/user-center-service'], function(hongcaiApp) {
  hongcaiApp.register
  .controller("userCenterCtrl", ["$scope", "$rootScope", "$stateParams", "userCenterService", function ($scope, $rootScope, $stateParams, userCenterService) {
  		var username;
  		$scope.username = $rootScope.loginName;
  }]);
});