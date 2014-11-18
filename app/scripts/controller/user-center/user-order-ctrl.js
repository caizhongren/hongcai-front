hongcaiApp.controller("UserOrderCtrl", ["$location", "$scope", "$rootScope", "$state", "$stateParams", "UserCenterService", "$location", function ($location,$scope,$rootScope, $state, $stateParams, UserCenterService, $location) {

    $rootScope.selectSide = 'userCenter-investment';

    var dateStart = 0;
    var dateEnd = 0;
    $scope.status = $stateParams.status || 0;
    $scope.dateInterval = $stateParams.dateInterval || 0;

    $scope.fromDateChanged = function () {
      dateStart = $scope.fromDate;
      $location.path("userCenter-investment"+'/'+$scope.dateInterval+'/'+$scope.status+'/'+dateStart+'/'+dateEnd);
    };

    $scope.untilDealDateChanged = function (status,dateInterval) {
      dateEnd = $scope.endDate;
      $location.path("userCenter-investment"+'/'+$scope.dateInterval+'/'+$scope.status+'/'+dateStart+'/'+dateEnd);
    };

    var getOrderByUser = UserCenterService.getOrderByUser.get({ dateInterval: $stateParams.dateInterval,
                                                              status: $stateParams.status},
                                                              function(response) {
        $scope.orderList = getOrderByUser.data.orderVoList;
        $scope.orderCount = getOrderByUser.data.orderCount;
        $scope.amount = getOrderByUser.data.amount;
        $scope.dateInterval = getOrderByUser.data.dateInterval;
        $scope.status = getOrderByUser.data.status;
        $scope.dateInterval = getOrderByUser.data.dateInterval;
        $scope.dateStart = getOrderByUser.data.dateStart;
        $scope.dateEnd = getOrderByUser.data.dateEnd;

        $scope.currentPage = 0;
        $scope.pageSize = 6;
        $scope.data = [];

        $scope.numberOfPages = function() {
            return Math.ceil($scope.data.length / $scope.pageSize);
        }
        for (var i = 0; i < $scope.orderList.length; i++) {
            $scope.data.push($scope.orderList[i]);
        }
    });
}]);

