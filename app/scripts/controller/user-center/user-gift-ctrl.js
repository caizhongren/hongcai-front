'use strict';
hongcaiApp.controller('UserGiftCtrl', ['$location', '$scope', '$rootScope', '$state', '$stateParams', 'UserCenterService', function ($location,$scope,$rootScope, $state, $stateParams, UserCenterService) {
    $rootScope.redirectUrl = $location.path();
    $rootScope.selectSide = 'gift-rebate';

    var dateStart = 0;
    var dateEnd = 0;
    $scope.status = $stateParams.status || 0;
    $scope.dateInterval = $stateParams.dateInterval || 0;
    $scope.fromDateChanged = function () {
      dateStart = $scope.invFromDate;
    };
    $scope.untilDealDateChanged = function (status,dateInterval) {
      dateEnd = moment($scope.invUntilDate).add(1,'day').subtract(1,'second').valueOf();
      $location.path('gift-rebate/'+'99'+'/'+dateInterval+'/'+status+'/'+dateStart+'/'+dateEnd);
    };

    var getOrderByUser = UserCenterService.getOrderByUser.get({ type: $stateParams.type,dateInterval: $stateParams.dateInterval,
    															status: $stateParams.status,dateStart: $stateParams.dateStart,dateEnd: $stateParams.dateEnd},
    															function(response) {

        $scope.orderList = getOrderByUser.data.orderVoList;
        $scope.orderCount = getOrderByUser.data.orderCount;
        $scope.amount = getOrderByUser.data.amount;
        $scope.dateInterval = getOrderByUser.data.dateInterval;
        $scope.status = getOrderByUser.data.status;
        // $scope.invFromDate = getOrderByUser.data.dateStart;
        // $scope.invUntilDate = getOrderByUser.data.dateEnd;
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

