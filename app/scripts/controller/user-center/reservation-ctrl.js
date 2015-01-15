'use strict';
angular.module('hongcaiApp')
  .controller('ReservationCtrl', ['$scope', '$rootScope', '$state', '$stateParams','$location', '$window', 'toaster', '$modal', 'UserCenterService',  function ($scope,$rootScope, $state, $stateParams, $location, $window, toaster, $modal, UserCenterService) {
    $rootScope.selectSide = 'reservation';
    $scope.type = $stateParams.type || 0;
    $scope.dateInterval = $stateParams.dateInterval || 0;
    // 亲爱的后台小伙伴们，这里修改调用接口 getDealByUser
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

