'use strict';
angular.module('hongcaiApp')
  .controller('GuaranteeproListCtrl', function($scope, $stateParams, $rootScope, $location, $state, ProjectService, CreditService, toaster, ProjectUtils, DateUtils, projectStatusMap) {
    $rootScope.pageTitle = '宏金宝 - 要理财，上宏财!';
    $scope.sortType = $stateParams.sortType || false;
    $scope.showFlag = $stateParams.showFlag || 0;
    $scope.projectStatusMap = projectStatusMap;
    $scope.pageSize = 6;

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
      $location.path('/guaranteepro-list/6,7,8,9,10,11,12/0/100/0/100/0/200000000/release_start_time/false');
    }


    /**
     * 宏金保
     */
    $scope.getProjectList = function(page, pageSize) {
      $scope.currentPage = page;
      $scope.showFlag = 1;
      ProjectService.projectList.get({
        status: $stateParams.status,
        minCycle: $stateParams.minCycle,
        maxCycle: $stateParams.maxCycle,
        minEarning: $stateParams.minEarning,
        maxEarning: $stateParams.maxEarning,
        minTotalAmount: $stateParams.minTotalAmount,
        maxTotalAmount: $stateParams.maxTotalAmount,
        sortCondition: $stateParams.sortCondition,
        sortType: $scope.sortType,
        categoryCode: "01",
        page: page,
        pageSize: pageSize
      }, function(response) {
        if (response.ret !== 1) {
          $scope.data = [];
          toaster.pop('warning', '服务器正在努力的加载....请稍等。');
        }
        $scope.serverTime = response.data.serverTime;
        $scope.projectList = response.data.projectList;
        $scope.baseFileUrl = response.data.baseFileUrl;
        $scope.repaymentTypeMap = response.data.repaymentTypeMap;
        $scope.pageCount = response.data.pageCount;
        $scope.status = $stateParams.status;
        $scope.minCycle = $stateParams.minCycle;
        $scope.maxCycle = $stateParams.maxCycle;
        $scope.minEarning = $stateParams.minEarning;
        $scope.maxEarning = $stateParams.maxEarning;
        $scope.minTotalAmount = $stateParams.minTotalAmount;
        $scope.maxTotalAmount = $stateParams.maxTotalAmount;
        $scope.sortCondition = $stateParams.sortCondition;
        $scope.orderProp = 'id';
        $scope.data = [];
        $scope.numberOfPages = function() {
          return $scope.pageCount;
        }
        for (var i = 0; i < $scope.projectList.length; i++) {
          $scope.projectList[i].progress = ($scope.projectList[i].soldStock + $scope.projectList[i].occupancyStock) * 100 / $scope.projectList[i].countInvest;
          $scope.projectList[i].showByStatus = $scope.projectList[i].status === 6 || $scope.projectList[i].status === 7 ? true : false;
          ProjectUtils.projectTimedown($scope.projectList[i],$scope.serverTime);
          $scope.data.push($scope.projectList[i]);
        }
      });
    };


    $scope.page = function(page) {
      if ($scope.currentPage !== page) {
        $scope.getProjectList(page, $scope.pageSize);
      }
    }
    $scope.getProjectList(1, $scope.pageSize);
  })

.directive('projectPagination', function() {
  return {
    restrict: 'AE',
    templateUrl: 'views/partials/_pagination.html'
  };
});
