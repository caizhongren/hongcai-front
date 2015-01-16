'use strict';
angular.module('hongcaiApp')
  .controller('ReservationCtrl', ['$scope', '$rootScope', '$state', '$stateParams','$location', '$window', 'toaster', '$modal', 'UserCenterService',  function ($scope,$rootScope, $state, $stateParams, $location, $window, toaster, $modal, UserCenterService) {

    $rootScope.selectSide = 'reservation';
    $scope.type = $stateParams.type || 0;
    $scope.dateInterval = $stateParams.dateInterval || 0;
    // 亲爱的后台小伙伴们，这里修改调用接口 getDealByUser
    $scope.orderList = [];
    UserCenterService.getUserReserveRecords.get({ },function(response) {
      if (response.ret === 1) {
        var orderList = response.data.reserveOrders;
        for (var i = orderList.length - 1; i >= 0; i--) {
            var order = [];
            order.project = orderList[i].project;
            for (var j = orderList[i].reserveOrders.length - 1; j >= 0; j--) {
               order.reserveOrder =  orderList[i].reserveOrders[j];
               $scope.orderList.push(order);
            };
        };


        $scope.pageCount = response.data.pageCount;
      } else {
        console.log('ask record, why getDealByUser did not load data...');
      }
    });


    $scope.name = '王小二';
    $scope.cancelReservation = function(resId) {
      $scope.msg = '亲，宏包超额了！';
      $modal({scope: $scope, template: 'views/modal/modal-canel-reservation.html', show: true});
      // if ($window.confirm('确定取消预约?')) {
      //   // 确定要删除预约
      //   // 删除预约的函数在这里
      // } else {
      //   toaster.pop('warning', '无法取消预约订单，请重试。');
      // }
    };
  }]);

