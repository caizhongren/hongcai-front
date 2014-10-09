
	hongcaiApp.controller("UserCenterCtrl", ["$scope", "$rootScope", "$stateParams", "UserCenterService", function ($scope, $rootScope, $stateParams, UserCenterService) {
		var username;
		$scope.username = $rootScope.loginName;
	}]);
