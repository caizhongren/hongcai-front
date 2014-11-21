hongcaiApp.controller("InviteRebateCtrl", [ "$scope", "$state", "$rootScope", "UserCenterService", function ($scope, $state, $rootScope, UserCenterService) {

    $rootScope.selectSide = 'invite-rebate';

    UserCenterService.getInviteList.get(function(response) {
    	if(response.ret == 1) {
    		$scope.voucher = response.data.voucher;
    		$scope.inviteList = response.data.inviteList;
    		$scope.currentPage = 0;
	        $scope.pageSize = 6;
	        $scope.data = [];

	        $scope.numberOfPages = function() {
	            return Math.ceil($scope.data.length / $scope.pageSize);
	        }
	        for (var i = 0; i < $scope.inviteList.length; i++) {
	            $scope.data.push($scope.inviteList[i]);
	        }

		} else {
            
        }
        
    });

}]);


