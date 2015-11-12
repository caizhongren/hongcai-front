'use strict';
angular.module('hongcaiApp')
  .controller('GuaranteeproListCtrl', function($scope, $stateParams, $rootScope, $location, $state, ProjectService, CreditService, toaster, DateUtils) {
    $scope.sortType = $stateParams.sortType || false;
    $scope.showFlag = $stateParams.showFlag || 0;
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

    // 宏金保
    $scope.getProjectList = function() {
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
        sortType: $scope.sortType
      }, function(response) {
        if (response.ret === 1) {
          $scope.serverTime = response.data.serverTime;
          $scope.projectList = response.data.projectList;
          $scope.baseFileUrl = response.data.baseFileUrl;
          $scope.status = $stateParams.status;
          $scope.minCycle = $stateParams.minCycle;
          $scope.maxCycle = $stateParams.maxCycle;
          $scope.minEarning = $stateParams.minEarning;
          $scope.maxEarning = $stateParams.maxEarning;
          $scope.minTotalAmount = $stateParams.minTotalAmount;
          $scope.maxTotalAmount = $stateParams.maxTotalAmount;
          $scope.sortCondition = $stateParams.sortCondition;
          $scope.orderProp = 'id';
          $scope.currentPage = 0;
          $scope.pageSize = 8;
          $scope.data = [];
          $scope.numberOfPages = function() {
            return Math.ceil($scope.data.length / $scope.pageSize);
          };
          for (var i = 0; i < $scope.projectList.length; i++) {
            $scope.projectList[i].countdown = (new Date($scope.projectList[i].releaseStartTime).getTime() - $scope.serverTime)/1000 + 2;
            $scope.projectList[i].showByStatus = $scope.projectList[i].status === 6 || $scope.projectList[i].status === 7 ? true : false;
            $scope.data.push($scope.projectList[i]);
          }
          $scope._timeDown = [];
          $scope.counter = 0;
          var interval = window.setInterval(function() {
            $scope.counter++;
            for (var i = 0; i < $scope.data.length; i++) {
              $scope._timeDown[i] = $scope.timeUntil($scope.data[i].countdown);
            }
            $scope.$apply();
          }, 1000);

          $scope.$on('$stateChangeStart', function() {
            clearInterval(interval);
          });
        } else {
          $scope.data = [];
          toaster.pop('warning', '服务器正在努力的加载....请稍等。');
          console.log('ask project-list, why projectList did not load data...');
        }
      });
    };


    // 债券转让
    // FIX
    /*$scope.getCreditList = function() {
      $scope.showFlag = 3;
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
            $scope.data.push($scope.assignmentList[i]);
          }
        }
      });
    };*/

    $scope.timeUntil = function(stDate) {
      var collectTime = {};
      stDate = stDate - $scope.counter;
      if (stDate === 0) {
        $scope.getProjectList();
        $state.reload();
      }

      var time = DateUtils.toDayHourMinSeconds(stDate);
      collectTime.day = time.day;
      collectTime.hour = time.hour;
      collectTime.second = time.seconds;
      collectTime.min = time.min;
      return collectTime;
    };

    $scope.getProjectList();
  })

  .directive('projectPagination', function() {
    return {
      restrict: 'AE',
      templateUrl: 'views/partials/_pagination.html'
    };
  });
