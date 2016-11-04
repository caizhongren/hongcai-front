'use strict';
angular.module('hongcaiApp')
  .controller('AssignmentListCtrl', ['$scope', '$stateParams', '$rootScope', '$location', '$state', 'ProjectService', 'CreditService', 'toaster', function($scope, $stateParams, $rootScope, $location, $state, ProjectService, CreditService, toaster) {
    $scope.sortOrder = $stateParams.sortOrder || false;
    $scope.pageSize = 6;
    $scope.sortType = $stateParams.sortType;
    $scope.remainDays = $stateParams.remainDays;
    $scope.annualEarnings = $stateParams.annualEarnings;
    $scope.currentStocks = $stateParams.currentStocks;
    // console.log($stateParams);


    $scope.getAssignmentList = function(page, pageSize) {
      $scope.currentPage = page;
      ProjectService.assignmentList.get({
        page: page, 
        pageSize: pageSize,
        sortType: $scope.sortType,
        remainDays: $scope.remainDays,
        annualEarnings: $scope.annualEarnings,
        sortOrder: $scope.sortOrder,
        currentStocks: $scope.currentStocks
      }, function(response) {
        if(response){
          $scope.data = response.assignments;
          $scope.pageCount = response.pageCount;
          // $scope.currentPage = 1;
          $scope.numberOfPages = function() {
            return Math.ceil(response.pageSize/$scope.pageSize);
          };
        }else {
          $scope.data = [];
          toaster.pop('warning', '服务器正在努力的加载....请稍等。');
        }
      });
    }
    $scope.getAssignmentList(1, $scope.pageSize);

    $scope.page = function(page) {
      if ($scope.currentPage !== page) {
        $scope.getAssignmentList(page, $scope.pageSize);
      }
      $scope.getAssignmentList(1, $scope.pageSize);
    };
    
    
    if ($scope.sortOrder === 'true') {
      $scope.sortOrder = true;
    } else {
      $scope.sortOrder = false;
    }

    $scope.sortType = parseInt($scope.sortType || 0);
    $scope.toggleSort = function(){
      $scope.sortOrder = !$scope.sortOrder
    } 
    // function isEmptyObject(obj) {
    //   var name;
    //   for (name in obj) {
    //     return false;
    //   }
    //   return true;
    // }

    // if (isEmptyObject($stateParams)) {
    //   $location.path('/assignments?1&6&1');
    // }

    // $scope.currentPage = 1;
    // CreditService.getCreditAssignmentList.get({
    //   minTransferAmount: $stateParams.minTransferAmount,
    //   maxTransferAmount: $stateParams.maxTransferAmount,
    //   minCycle: $stateParams.minCycle,
    //   maxCycle: $stateParams.maxCycle,
    //   minEarning: $stateParams.minEarning,
    //   maxEarning: $stateParams.maxEarning,
    //   minTotalAmount: $stateParams.minTotalAmount,
    //   maxTotalAmount: $stateParams.maxTotalAmount,
    //   sortCondition: $stateParams.sortCondition,
    //   sortType: $stateParams.sortType
    // }, function(response) {
    //   if (response.ret === 1) {
    //     $scope.assignmentList = response.data.assignmentList;
    //     $scope.pageCount = response.data.pageCount;
    //     $scope.dataSize = response.data.count;
    //     $scope.currentPage = 0;
    //     $scope.pageSize = 8;
    //     $scope.data = [];
    //     $scope.numberOfPages = function() {
    //       return Math.ceil($scope.data.length / $scope.pageSize);
    //     };
    //     for (var i = 0; i < $scope.assignmentList.length; i++) {
    //       $scope.assignmentList[i].progress = ($scope.assignmentList[i].creditAssignment.soldStock + $scope.assignmentList[i].creditAssignment.occupancyStock) / ($scope.assignmentList[i].creditAssignment.soldStock + $scope.assignmentList[i].creditAssignment.occupancyStock + $scope.assignmentList[i].creditAssignment.currentStock);
    //       $scope.data.push($scope.assignmentList[i]);
    //     }
    //   }
    // });


    // $rootScope.selectPage = $location.path().split('/')[1];

  }]);
