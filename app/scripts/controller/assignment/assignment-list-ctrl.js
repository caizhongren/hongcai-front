'use strict';
angular.module('hongcaiApp')
  .controller('AssignmentListCtrl', function($scope, $stateParams, $rootScope, $location, $state, ProjectService, CreditService, toaster) {
    $scope.sortOrder = $stateParams.sortOrder || false;
    $scope.pageSize = 6;
    $scope.sortType = $stateParams.sortType;
    $scope.remainDays = $stateParams.remainDays;
    $scope.annualEarnings = $stateParams.annualEarnings;
    $scope.currentStocks = $stateParams.currentStocks;


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
        if(response && response.ret !== -1){
          $scope.data = response.assignments;
          $scope.pageCount = response.pageCount;
          $scope.numberOfPages = function() {
            return response.pageCount;
          };
        }else {
          $scope.data = [];
          toaster.pop('warning', '服务器正在努力的加载....请稍等。');
        }
      });
    }
    $scope.getAssignmentList(1, $scope.pageSize);

    /**
     * 请求下一页，上一页
     */
    $scope.page = function(page) {
      if(page <= 0 || page > $scope.pageCount || $scope.currentPage == page){
        return;
      }

      $scope.getAssignmentList(page, $scope.pageSize);
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

  });
