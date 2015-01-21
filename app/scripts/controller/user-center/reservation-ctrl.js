'use strict';
angular.module('hongcaiApp')
  .controller('ReservationCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$location', '$window', 'toaster', '$modal', 'UserCenterService', function($scope, $rootScope, $state, $stateParams, $location, $window, toaster, $modal, UserCenterService) {

    $rootScope.selectSide = 'reservation';
    $scope.type = $stateParams.type || '2,3,5,6';
    $scope.dateInterval = $stateParams.dateInterval || '0';
    $scope.currentPage = $scope.currentPage || 1;

    $scope.getReserveOrders = function() {
      $scope.orderList = [];
      var startTime = 0;
      if ($scope.dateInterval === '7') {
        startTime = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
      } else if ($scope.dateInterval === '30') {
        startTime = new Date().getTime() - 30 * 24 * 60 * 60 * 1000;
      } else if ($scope.dateInterval === '90') {
        startTime = new Date().getTime() - 90 * 24 * 60 * 60 * 1000;
      }
      UserCenterService.getUserReserveRecords.get({
        page: $scope.currentPage,
        type: $scope.type,
        startTime: startTime
      }, function(response) {
        if (response.ret === 1) {
          var orderList = response.data.reserveOrders;
          for (var i = orderList.length - 1; i >= 0; i--) {
            for (var j = orderList[i].reserveOrders.length - 1; j >= 0; j--) {
              var order = [];
              order.project = orderList[i].project;
              order.reserveOrder = orderList[i].reserveOrders[j];
              $scope.orderList.push(order);
            }
            $scope.currentPage = response.data.page;
            $scope.pageCount = response.data.pageCount;
            $scope.statistics = response.data.statistics;
            $scope.statusMap = response.data.statusMap;
        } else {
          console.log('ask reservation, why getUserReserveRecords did not load data...');
        }
      });
    };

    $scope.getReserveOrders();

    $scope.cancelReservation = function(reserveOrder) {
      $scope.freezeAmount = reserveOrder.freezeAmount;
      $scope.reserveAmount = reserveOrder.reserveAmount;
      $scope.returnProfit = reserveOrder.returnProfit;
      $scope.reserveOrder = reserveOrder;
      $scope.cancelNum = $scope.statistics.cancelNum;
      $modal({
        scope: $scope,
        template: 'views/modal/modal-canel-reservation.html',
        show: true
      });
    };

    $scope.reserveCancel = function(reserveOrder) {
      UserCenterService.reserveCancel.get({
        reserveOrderId: reserveOrder.id,
        projectId: reserveOrder.projectId
      }, function(response) {
        if (response.ret === 1) {
          $scope.getReserveOrders();
        }
      });
    };

  }]);
