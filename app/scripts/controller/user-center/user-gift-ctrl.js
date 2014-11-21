hongcaiApp.controller("UserGiftCtrl", ["$location", "$scope", "$rootScope", "$state", "$stateParams", "UserCenterService", function ($location,$scope,$rootScope, $state, $stateParams, UserCenterService) {

    $rootScope.selectSide = 'userCenter-investment';

    var dateStart = 0;
    var dateEnd = 0;
    $scope.status = $stateParams.status || 0;
    $scope.dateInterval = $stateParams.dateInterval || 0;
    // 时间组件 先注释
    // $scope.openStartTime = function($event) {
    //   $event.preventDefault();
    //   $event.stopPropagation();

    //   $scope.openedStartTime = true;
    // };
    // $scope.openEndTime = function($event) {
    //   $event.preventDefault();
    //   $event.stopPropagation();

    //   $scope.openedEndTime = true;
    // };

    //  时间组件结束
    $scope.fromDateChanged = function () {
      dateStart = $scope.fromDate;
    };

    $scope.untilDealDateChanged = function (status,dateInterval) {
      dateEnd = $scope.endDate;
      $location.path('userCenter-investment/'+dateInterval+'/'+status+'/'+dateStart+'/'+dateEnd)
    };

    var getOrderByUser = UserCenterService.getOrderByUser.get({ dateInterval: $stateParams.dateInterval,
    															status: $stateParams.status,dateStart: $stateParams.dateStart,dateEnd: $stateParams.dateEnd,type: 99},
    															function(response) {

        $scope.orderList = getOrderByUser.data.orderVoList;
        $scope.orderCount = getOrderByUser.data.orderCount;
        $scope.amount = getOrderByUser.data.amount;
        $scope.dateInterval = getOrderByUser.data.dateInterval;
        $scope.status = getOrderByUser.data.status;
        $scope.fromDate = getOrderByUser.data.dateStart;
        $scope.endDate = getOrderByUser.data.dateEnd;

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

