hongcaiApp.controller("UserOrderCtrl", ["$location", "$scope", "$rootScope", "$state", "$stateParams", "UserCenterService", function ($location,$scope,$rootScope, $state, $stateParams, UserCenterService) {
    
	$rootScope.selectSide = 'userCenter-investment';

	var dateStart = 0;
	var dateEnd = 0;

	$scope.fromDateChanged = function () {
        dateStart = $scope.fromDate;

    };

    $scope.untilDateChanged = function (status,dateInterval) {
        $location.path('userCenter-investment/:'+dateInterval+'/:'+status+'/:'+dateStart+'/:'+dateEnd)

    };

    var getOrderByUser = UserCenterService.getOrderByUser.get({ dateInterval: $stateParams.dateInterval,
    															status: $stateParams.status},
    															function(response) {
        $scope.orderList = getOrderByUser.data.orderVoList;
        $scope.orderCount = getOrderByUser.data.orderCount;
        $scope.amount = getOrderByUser.data.amount;
        $scope.dateInterval = getOrderByUser.data.dateInterval;
        $scope.status = getOrderByUser.data.status;
        console.info($scope.status);
        $scope.dateInterval = getOrderByUser.data.dateInterval;


    });
}]);

