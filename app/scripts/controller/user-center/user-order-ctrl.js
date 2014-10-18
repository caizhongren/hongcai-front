hongcaiApp.controller("UserOrderCtrl", ["$scope", "$state", "$stateParams", "UserCenterService", function ($scope, $state, $stateParams, UserCenterService) {
    var getOrderByUser = UserCenterService.getOrderByUser.get(function(response) {
        $scope.orderList = getOrderByUser.data.orderVoList;
        console.info($scope.orderList);

    });
}]);

