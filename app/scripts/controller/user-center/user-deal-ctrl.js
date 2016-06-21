/**
 * 用户交易记录页
 */
'use strict';
angular.module('hongcaiApp')
  .controller('UserDealCtrl', function ($scope, $rootScope, toaster, UserCenterService) {
    $scope.type = 0;
    $scope.dateInterval = 0;
    $scope.dealType = 0;
    $scope.currentPage = 1;
    $scope.pageSize = 10;

    $scope.getDeals = function(page) {
      $scope.currentPage = page;
      var getDealByUser = UserCenterService.getDealByUser.get({ 
        dateInterval: $scope.dateInterval,
        dealType: $scope.dealType,
        page: page
      },function(response) {
        if (getDealByUser.ret === 1) {
          $scope.dealList = getDealByUser.data.dealList;
          $scope.type = getDealByUser.data.type;
          $scope.dateInterval = getDealByUser.data.dateInterval;
          $scope.userId = getDealByUser.data.userId;
          $scope.capital = getDealByUser.data.capital;
          $scope.dealTypes = getDealByUser.data.dealTypes;
          $scope.data = [];
          $scope.totalPage = Math.ceil(getDealByUser.data.count / $scope.pageSize);

          for (var i = 0; i < $scope.dealList.length; i++) {
            $scope.data.push($scope.dealList[i]);
          }
          $scope.icons = [];
          for (var j in $scope.dealTypes) {
            var obj = {};
            obj.value = '' + j + '';
            obj.label = '' + $scope.dealTypes[j] + '';
            $scope.icons.push(obj);
          }

        } else {
          toaster.pop('warning',response.msg);
        }
      });
    };

    $scope.getDeals(1);

  });

