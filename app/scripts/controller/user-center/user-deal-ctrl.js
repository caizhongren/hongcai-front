hongcaiApp.controller("UserDealCtrl", ["$scope", "$rootScope", "$state", "$stateParams", "UserCenterService", function ($scope,$rootScope, $state, $stateParams, UserCenterService) {
    
	$rootScope.selectSide = 'userCenter-investment';
    var getDealByUser = UserCenterService.getDealByUser.get({ dateInterval: $stateParams.dateInterval,
    															type: $stateParams.type},
    															function(response) {
        $scope.dealList = getDealByUser.data.dealList;
		$scope.dateInterval = getOrderByUser.data.dateInterval;
        $scope.type = getOrderByUser.data.type;

    });
}]);

