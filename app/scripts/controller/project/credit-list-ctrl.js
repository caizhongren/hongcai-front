'use strict';
angular.module('hongcaiApp')
  .controller('CreditListCtrl', ['$scope', '$stateParams', '$rootScope', '$location', '$state', 'CreditService', 'toaster', function($scope, $stateParams, $rootScope, $location, $state, CreditService, toaster) {
    $scope.sortType = $stateParams.sortType || false;
    // console.log($stateParams);
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

    $scope.currentPage = 1;
    CreditService.getCreditAssignmentList.get({
      minTransferAmount: $stateParams.minTransferAmount,
      maxTransferAmount: $stateParams.maxTransferAmount,
      minCycle: $stateParams.minCycle,
      maxCycle: $stateParams.maxCycle,
      minEarning: $stateParams.minEarning,
      maxEarning: $stateParams.maxEarning,
      minTotalAmount: $stateParams.minTotalAmount,
      maxTotalAmount: $stateParams.maxTotalAmount,
      sortCondition: $stateParams.sortCondition,
      sortType: $stateParams.sortType
    }, function(response) {
      if (response.ret === 1) {
        $scope.assignmentList = response.data.assignmentList;
        $scope.pageCount = response.data.pageCount;
        $scope.dataSize = response.data.count;
        $scope.currentPage = 0;
        $scope.pageSize = 8;
        $scope.data = [];
        $scope.numberOfPages = function() {
          return Math.ceil($scope.data.length / $scope.pageSize);
        };
        for (var i = 0; i < $scope.assignmentList.length; i++) {
          $scope.assignmentList[i].progress = ($scope.assignmentList[i].creditAssignment.soldStock + $scope.assignmentList[i].creditAssignment.occupancyStock) / ($scope.assignmentList[i].creditAssignment.soldStock + $scope.assignmentList[i].creditAssignment.occupancyStock + $scope.assignmentList[i].creditAssignment.currentStock);
          $scope.data.push($scope.assignmentList[i]);
        }
      }
    });


    $rootScope.selectPage = $location.path().split('/')[1];

  }]);
