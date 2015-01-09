'use strict';
angular.module('hongcaiApp')
  .controller('UserDealCtrl', ['$scope', '$rootScope', '$state', '$stateParams','$location', 'UserCenterService', function ($scope,$rootScope, $state, $stateParams, $location, UserCenterService) {
    $rootScope.selectSide = 'record';
    $scope.type = $stateParams.type || 0;
    $scope.dateInterval = $stateParams.dateInterval || 0;
    $scope.typeValue = { '1': '充值', '2': '提现', '3': '投资', '4': '收益', '5': '回收本金', '6': '放款' };

    var getDealByUser = UserCenterService.getDealByUser.get({ dateInterval: $stateParams.dateInterval,type: $stateParams.type},function() {
      if (getDealByUser.ret === 1) {
        $scope.dealList = getDealByUser.data.dealList;
        $scope.type = getDealByUser.data.type;
        $scope.dateInterval = getDealByUser.data.dateInterval;
        $scope.userId = getDealByUser.data.userId;
        $scope.capital = getDealByUser.data.capital;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.data = [];

        $scope.numberOfPages = function() {
          return Math.ceil($scope.data.length / $scope.pageSize);
        };
        for (var i = 0; i < $scope.dealList.length; i++) {
          $scope.data.push($scope.dealList[i]);
        }
      } else {
        console.log('ask record, why getDealByUser did not load data...');
      }
    });
  }]);

