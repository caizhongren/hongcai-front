hongcaiApp.controller("GiftOverviewCtrl", [ "$scope", "$state", "$rootScope", "$stateParams", "UserCenterService", "OrderService", "DEFAULT_DOMAIN", function ($scope, $state, $rootScope, $stateParams, UserCenterService, OrderService, DEFAULT_DOMAIN) {

    $rootScope.selectSide = 'gift-overview';

    UserCenterService.getGiftListByUserId.get(function(response) {
    	if(response.ret == 1) {
    		$scope.giftList = response.data.giftList;
    		$scope.currentPage = 0;
	        $scope.pageSize = 6;
	        $scope.data = [];
	        $scope.totalAmount = 0;
	        $scope.numberOfPages = function() {
	            return Math.ceil($scope.data.length / $scope.pageSize);
	        }
	        for (var i = 0; i < $scope.giftList.length; i++) {
	            $scope.data.push($scope.giftList[i]);
	            $scope.totalAmount += $scope.giftList[i].gift.amount;
	        }
	        
		} else {
            
        }
    });

}]);
