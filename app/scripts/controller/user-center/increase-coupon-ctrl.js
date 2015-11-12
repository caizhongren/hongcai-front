'use strict';
angular.module('hongcaiApp')
  .controller('IncreaseCouponCtrl', function($location, $scope, $http, $rootScope, $state, $stateParams, UserCenterService, $aside, $window, OrderService, config, toaster, $alert) {
    $rootScope.redirectUrl = $location.path();
    $rootScope.selectSide = 'increaseCoupon';

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
  });
