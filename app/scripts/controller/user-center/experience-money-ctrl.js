'use strict';
angular.module('hongcaiApp')
  .controller('ExperienceMoneyCtrl', function($location, $scope, $http, $rootScope, $state, $stateParams, UserCenterService, $aside, $window, OrderService, config, toaster, $alert) {
    $scope.datas = [];

    $scope.loadExperienceDeals = function(page, pageSize, status){
      UserCenterService.userExperienceDeals.get({
        page: page,
        pageSize: pageSize,
        status: status
      }, function(response) {
        if (response.ret === 1) {
          $scope.currentPage = page;
          $scope.pageSize = pageSize;
          $scope.dealStatus = status;
          $scope.count = response.data.count;
          $scope.numberOfPages = Math.ceil($scope.count / pageSize);
          $scope.datas = response.data.experienceDeals;
          $scope.receiveProfit = response.data.receiveProfit;
        } else {
          toaster.pop('warning', response.msg);
        }
      });
    };

    $scope.dealStatus = 2;
    $scope.currentPage = 1;
    $scope.pageSize = 5;

    $scope.loadExperienceDeals($scope.currentPage, $scope.pageSize, $scope.dealStatus);
  });
