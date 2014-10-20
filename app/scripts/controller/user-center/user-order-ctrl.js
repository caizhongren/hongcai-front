hongcaiApp.controller("UserOrderCtrl", ["$scope", "$rootScope", "$state", "$stateParams", "UserCenterService", function ($scope,$rootScope, $state, $stateParams, UserCenterService) {
    
	$rootScope.selectSide = 'userCenter-investment';
    var getOrderByUser = UserCenterService.getOrderByUser.get(function(response) {
        $scope.orderList = getOrderByUser.data.orderVoList;
        $scope.orderCount = getOrderByUser.data.orderCount;
        $scope.amount = getOrderByUser.data.amount;
        $scope.dateInterval = getOrderByUser.data.dateInterval;

    });
}]);

