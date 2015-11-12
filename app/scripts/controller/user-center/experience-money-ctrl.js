'use strict';
angular.module('hongcaiApp')
  .controller('ExperienceMoneyCtrl', function($location, $scope, $http, $rootScope, $state, $stateParams, UserCenterService, $aside, $window, OrderService, config, toaster, $alert) {
    $rootScope.redirectUrl = $location.path();
    $rootScope.selectSide = 'experienceMoney';
    /**
     * 体验金统计信息
     */
    UserCenterService.getUserExperienceMoneyDetail.get({}, function(response) {
      if (response.ret === 1) {
        $scope.experienceDealStatis = response.data.experienceDealStatis;
        $scope.investDeals = $scope.experienceDealStatis.investDeals;
        $scope.deals = $scope.experienceDealStatis.deals;
      } else {
        toaster.pop('warning', response.msg);
      }
    });
  });
