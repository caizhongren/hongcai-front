'use strict';
angular.module('hongcaiApp')
  .controller('IncreaseCouponCtrl', function(ipCookie, $location, $scope, $rootScope, $state, $stateParams, UserCenterService, toaster, $alert) {
    $scope.datas = [];

    /**
     * 加息券统计信息
     */
    UserCenterService.getUserIncreaseRateCouponStatis.get({}, function(response) {
      if (response.ret === 1) {
        $scope.couponStatis = response.data.couponStatis;
      }
    });
    /**
     * 查询加息券
     */
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
          for (var i = 0; i < $scope.datas.length; i++) {
            if ($scope.datas[i].investProductType == '5') {
              $scope.datas[i].investProductType = '宏财精选';
            }else if ($scope.datas[i].investProductType == '6') {
              $scope.datas[i].investProductType = '宏财尊贵';
            }else if ($scope.datas[i].investProductType == '5,6') {
              $scope.datas[i].investProductType = '宏财精选、宏财尊贵';
            }else {
              $scope.datas[i].investProductType = '宏财精选';
            }
          };
        }
      });
    };

    $scope.usedStatus = $stateParams.usedStatus || '1,3';
    $scope.currentPage = 1;
    $scope.pageSize = 5;


    $scope.loadCoupons($scope.currentPage, $scope.pageSize, $scope.usedStatus);
    /**
     * 立即使用
     */
    $scope.toProjectList = function($index){
      $state.go('root.guaranteepro-list-query-no');
      ipCookie('rateNum',$scope.datas[$index].number);
      ipCookie('rateType',$scope.datas[$index].type);
    }
  });
