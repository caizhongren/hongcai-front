'use strict';
angular.module('hongcaiApp')
  .controller('CreditListCtrl', ['$scope', '$stateParams', '$rootScope', '$location', '$state', 'CreditService', 'toaster', function($scope, $stateParams, $rootScope, $location, $state, CreditService, toaster) {
    $scope.sortType = $stateParams.sortType || false;
    console.log($stateParams);
    if ($scope.sortType === 'true') {
      $scope.sortType = true;
    } else {
      $scope.sortType = false;
    }
    $scope.toggleSort = function() {
      $scope.sortType = !$scope.sortType;
    };

    function isEmptyObject(obj) {
      var name;
      for (name in obj) {
        return false;
      }
      return true;
    }

    if (isEmptyObject($stateParams)) {
      $location.path('/credit-list/0/10000000/0/100/0/100/0/200000000/release_start_time/false');
    }

    //假数据
    $scope.item = {
      'status' : '7',
      'statusText' : '融资中',
      'progress' : 80
    }

    $scope.currentPage = 1;
    CreditService.getCreditAssignmentList.get({
        minTransferAmount: $stateParams.minTransferAmount ,
        maxTransferAmount:$stateParams.maxTransferAmount ,
        minCycle:$stateParams.minCycle ,
        maxCycle:$stateParams.maxCycle,
        minEarning:$stateParams.minEarning,
        maxEarning:$stateParams.maxEarning,
        minTotalAmount:$stateParams.minTotalAmount,
        maxTotalAmount:$stateParams.maxTotalAmount,
        sortCondition:$stateParams.sortCondition,
        sortType:$stateParams.sortType
    }, function(response){
        if (response.ret == 1){
          $scope.assignmentList = response.data.assignmentList;
          $scope.pageCount = response.data.pageCount;
          $scope.dataSize = response.data.count;
        }
    });


    // var response = ProjectService.projectList.get({
    //   status: $stateParams.status,
    //   minCycle: $stateParams.minCycle,
    //   maxCycle: $stateParams.maxCycle,
    //   minEarning: $stateParams.minEarning,
    //   maxEarning: $stateParams.maxEarning,
    //   minTotalAmount: $stateParams.minTotalAmount,
    //   maxTotalAmount: $stateParams.maxTotalAmount,
    //   sortCondition: $stateParams.sortCondition,
    //   sortType: $scope.sortType
    // }, function() {
    //   if (response.ret === 1) {
    //     $scope.serverTime = response.data.serverTime;
    //     $scope.projectList = response.data.projectList;
    //     $scope.baseFileUrl = response.data.baseFileUrl;
    //     $scope.status = $stateParams.status;
    //     $scope.minCycle = $stateParams.minCycle;
    //     $scope.maxCycle = $stateParams.maxCycle;
    //     $scope.minEarning = $stateParams.minEarning;
    //     $scope.maxEarning = $stateParams.maxEarning;
    //     $scope.minTotalAmount = $stateParams.minTotalAmount;
    //     $scope.maxTotalAmount = $stateParams.maxTotalAmount;
    //     $scope.sortCondition = $stateParams.sortCondition;
    //     $scope.orderProp = 'id';
    //     $scope.currentPage = 0;
    //     $scope.pageSize = 6;
    //     $scope.data = [];
    //     $scope.numberOfPages = function() {
    //       return Math.ceil($scope.data.length / $scope.pageSize);
    //     };
    //     for (var i = 0; i < $scope.projectList.length; i++) {
    //       $scope.projectList[i].countdown = moment($scope.projectList[i].releaseStartTime).diff(moment($scope.serverTime), 'seconds') + 2;
    //       $scope.data.push($scope.projectList[i]);
    //     }
    //     $scope._timeDown = [];
    //     $scope.counter = 0;
    //     var interval = window.setInterval(function() {
    //       $scope.counter++;
    //       for (var i = 0; i < $scope.data.length; i++) {
    //         $scope._timeDown[i] = $scope.timeUntil($scope.data[i].countdown);
    //       }
    //       $scope.$apply();
    //     }, 1000);

    //     $scope.$on('$stateChangeStart', function() {
    //       clearInterval(interval);
    //     });
    //   } else {
    //     $scope.data = [];
    //     toaster.pop('warning', '服务器正在努力的加载....请稍等。');
    //     console.log('ask project-list, why projectList did not load data...');
    //   }
    // });

    $rootScope.selectPage = $location.path().split('/')[1];

  }]);
