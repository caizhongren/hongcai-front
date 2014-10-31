hongcaiApp.controller("UserDealCtrl", ["$scope", "$rootScope", "$state", "$stateParams", "UserCenterService", function ($scope,$rootScope, $state, $stateParams, UserCenterService) {
    
    var dateStart = 0;
	var dateEnd = 0;

	$scope.fromDealDateChanged = function () {
        dateStart = $scope.fromDate;

    };

    $scope.untilDealDateChanged = function (status,dateInterval) {
        $location.path('userCenter-investment/:'+dateInterval+'/:'+status+'/:'+dateStart+'/:'+dateEnd)

    };

    var getDealByUser = UserCenterService.getDealByUser.get({ dateInterval: $stateParams.dateInterval,
    															type: $stateParams.type},
    															function(response) {
        $scope.dealList = getDealByUser.data.dealList;
        $scope.dateStart = getOrderByUser.data.dateStart;
        $scope.dateEnd = getOrderByUser.data.dateEnd;
        $scope.type = getDealByUser.data.type;
        $scope.dateInterval = getDealByUser.data.dateInterval;
        $scope.userId = getDealByUser.data.userId;
        $scope.capital = getDealByUser.data.capital;

    });
}]);

