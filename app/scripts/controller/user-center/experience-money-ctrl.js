'use strict';
angular.module('hongcaiApp')
  .controller('ExperienceMoneyCtrl', function($location, $scope, $http, $rootScope, $state, $stateParams, UserCenterService, $aside, $window, OrderService, config, toaster, $alert) {
    $rootScope.redirectUrl = $location.path();
    $rootScope.selectSide = 'experienceMoney';

    $scope.tab = 0;
    $scope.pageSize = 10;
    /**
     * 体验金统计信息
     */
    UserCenterService.getUserExperienceMoneyDetail.get({}, function(response) {
      if (response.ret === 1) {
        $scope.experienceDealStatis = response.data.experienceDealStatis;
        $scope.investDeals = $scope.experienceDealStatis.investDeals;
        $scope.deals = $scope.experienceDealStatis.deals;

        $scope.investDeals.page = {
          pageSize: 10,
          pageCount: Math.ceil($scope.investDeals.length / $scope.pageSize),
          currentPage: 1
        };

        $scope.deals.page = {
          pageSize: 10,
          pageCount: Math.ceil($scope.deals.length / $scope.pageSize),
          currentPage: 1
        };
      } else {
        toaster.pop('warning', response.msg);
      }
    });
  });
