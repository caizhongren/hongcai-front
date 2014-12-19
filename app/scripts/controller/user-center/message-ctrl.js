'use strict';
hongcaiApp.controller('MessageCtrl', ['$location', '$scope', 'toaster', '$state', '$rootScope', '$stateParams', 'UserCenterService', function ($location, $scope, toaster, $state, $rootScope, $stateParams, UserCenterService) {
	$rootScope.selectSide = 'message';

	UserCenterService.getUserMsgByStatus.get({status: '0,1'}, function(response) {
		if(response.ret === 1) {
			$scope.userMsgList = response.data.userMsgList;
			$scope.orderProp = 'id';
			$scope.currentPage = 0;
			$scope.pageSize = 6;
			$scope.data = [];
			$scope.numberOfPages = function() {
				return Math.ceil($scope.data.length / $scope.pageSize);
			}
			for (var i = 0; i < $scope.userMsgList.length; i++) {
				$scope.data.push($scope.userMsgList[i]);
			}

			console.log($scope.data)
		}
	});

}]);
