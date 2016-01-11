'use strict';
angular.module('hongcaiApp')
  .controller('GuaranteeproListCtrl', function($scope, $interval, $stateParams, $rootScope, $location, $state, ProjectService, CreditService, toaster, DateUtils) {
    $rootScope.pageTitle = '宏金宝 - 要理财，上宏财!';
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

    $scope.pageSize = 6;

    // 宏金保
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
        if (response.ret === 1) {
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
          // $scope.currentPage = page;
          // $scope.pageSize = pageSize;
          $scope.data = [];
          $scope.numberOfPages = function(){
            return $scope.pageCount;
          }
          for (var i = 0; i < $scope.projectList.length; i++) {
            $scope.projectList[i].progress = ($scope.projectList[i].soldStock + $scope.projectList[i].occupancyStock) * 100 / $scope.projectList[i].countInvest;
            // $scope.projectList[i].countdown = ($scope.projectList[i].releaseStartTime - $scope.serverTime) / 1000 + 2;
            $scope.projectList[i].countdown = new Date($scope.projectList[i].releaseStartTime).getTime() - $scope.serverTime;
            $scope.projectList[i]._timeDown = DateUtils.toHourMinSeconds($scope.projectList[i].countdown);
            $scope.projectList[i].showByStatus = $scope.projectList[i].status === 6 || $scope.projectList[i].status === 7 ? true : false;

            if ($scope.projectList[i].status === 6){
              $scope.projectList[i].timeDownFun = function(item) {
                $interval(function() {
                    item.countdown -= 1000;
                    if (item.countdown <= 0 && item.status == 2) {
                      $state.reload();
                    }

                    item._timeDown =  DateUtils.toHourMinSeconds(item.countdown);
                }, 1000);
              }
              $scope.projectList[i].timeDownFun($scope.projectList[i]);
            }


            $scope.data.push($scope.projectList[i]);

          }

          // $interval(function() {
          //   for (var i = 0; i < $scope.data.length; i++) {
          //     $scope.data[i].countdown -= 1000;
          //     if ($scope.data[i].countdown <= 0 && $scope.data[i].status == 2) {
          //       $state.reload();
          //     }

          //     $scope._timeDown =  DateUtils.toHourMinSeconds($scope.data[i].countdown);
          //     $scope.data[i].jigoubaoDay = $scope._timeDown.day || 0;
          //     $scope.data[i].jigoubaoHour = $scope._timeDown.hour;
          //     $scope.data[i].jigoubaoMinute = $scope._timeDown.min;
          //     $scope.data[i].jigoubaoSecond = $scope._timeDown.seconds;
          //   };
          // }, 1000);


          $scope.$on('$stateChangeStart', function() {
            clearInterval($interval);
          });
        } else {
          $scope.data = [];
          toaster.pop('warning', '服务器正在努力的加载....请稍等。');
          console.log('ask project-list, why projectList did not load data...');
        }
      });
    };


    $scope.page = function(page){
      if ($scope.currentPage !== page){
        $scope.getProjectList(page, $scope.pageSize);
      }
      
    }


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


    $scope.getProjectList(1, $scope.pageSize);
  })

.directive('projectPagination', function() {
  return {
    restrict: 'AE',
    templateUrl: 'views/partials/_pagination.html'
  };
});
