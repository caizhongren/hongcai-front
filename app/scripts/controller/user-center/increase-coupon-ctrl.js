'use strict';
angular.module('hongcaiApp')
  .controller('IncreaseCouponCtrl', function($location, $scope, $rootScope, $state, $stateParams, UserCenterService, toaster, $alert) {
    $scope.datas = [];

    /**
     * 加息券统计信息
     */
    UserCenterService.getUserIncreaseRateCouponStatis.get({}, function(response) {
      if (response.ret === 1) {
        $scope.couponStatis = response.data.couponStatis;
      } else {
        toaster.pop('warning', response.msg);
      }
    });
    //查询加息券
    $scope.loadCoupons = function(page, pageSize, status){
      UserCenterService.userIncreaseRateCoupons.get({
        page: page,
        pageSize: pageSize,
        status: status
      }, function(response) {
        if (response.ret === 1) {
          $scope.currentPage = page;
          $scope.pageSize = pageSize;
          $scope.usedStatus = status;
          $scope.count = response.data.count;
          $scope.numberOfPages = Math.ceil($scope.count / pageSize);
          $scope.datas = response.data.coupons;
          $scope.currentTime = response.data.currentTime;
        } else {
          toaster.pop('warning', response.msg);
        }
      });
    };

    $scope.usedStatus = parseInt($stateParams.usedStatus) || 1;
    $scope.currentPage = 1;
    $scope.pageSize = 5;


    $scope.loadCoupons($scope.currentPage, $scope.pageSize, $scope.usedStatus);
  });
