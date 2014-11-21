hongcaiApp.controller("GiftOverviewCtrl", [ "$scope", "$state", "$rootScope", "$stateParams", "UserCenterService", "OrderService", "DEFAULT_DOMAIN", function ($scope, $state, $rootScope, $stateParams, UserCenterService, OrderService, DEFAULT_DOMAIN) {

    $rootScope.selectSide = 'gift-overview';

    UserCenterService.getGiftListByUserId.get(function(response) {
    	if(response.ret == 1) {
    		$scope.giftList = response.data.giftList;
    		$scope.currentPage = 0;
	        $scope.pageSize = 6;
	        $scope.data = [];
	        $scope.totalAvailableAmount = 0;
	        $scope.totalUsedAmount = 0;

	        $scope.numberOfPages = function() {
	            return Math.ceil($scope.data.length / $scope.pageSize);
	        }
	        for (var i = 0; i < $scope.giftList.length; i++) {
	            $scope.data.push($scope.giftList[i]);
	            if($scope.giftList[i].gift.status == 2) {
	            	$scope.totalAvailableAmount += $scope.giftList[i].gift.amount;
	            }
	            if($scope.giftList[i].gift.status == 3) {
	            	$scope.totalUsedAmount += $scope.giftList[i].gift.amount;
	            }
	        }
	        
		} else {
            
        }
    });

}]);