define(['scripts/app', 'ngload!scripts/service/user-center/user-center-service'], function(hongcaiApp) {
	hongcaiApp.register.controller("UserCenterCtrl", ["$scope", "$rootScope", "$stateParams", "UserCenterService", function ($scope, $rootScope, $stateParams, UserCenterService) {
		var username;
		$scope.username = $rootScope.loginName;
	}]);
});