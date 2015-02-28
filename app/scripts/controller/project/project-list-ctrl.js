'use strict';
angular.module('hongcaiApp')
  .controller('ProjectListCtrl', ['$scope', '$stateParams', '$rootScope', '$location', '$state', 'ProjectService', 'toaster', function($scope, $stateParams, $rootScope, $location, $state, ProjectService, toaster) {
    $scope.sortType = $stateParams.sortType || false;
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
      $location.path('/project-list/6,7,8,9,10,11,12/0/100/0/100/0/200000000/release_start_time/false');
    }

    var response = ProjectService.projectList.get({
      status: $stateParams.status,
      minCycle: $stateParams.minCycle,
      maxCycle: $stateParams.maxCycle,
      minEarning: $stateParams.minEarning,
      maxEarning: $stateParams.maxEarning,
      minTotalAmount: $stateParams.minTotalAmount,
      maxTotalAmount: $stateParams.maxTotalAmount,
      sortCondition: $stateParams.sortCondition,
      sortType: $scope.sortType
    }, function() {
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
        $scope.pageSize = 6;
        $scope.data = [];
        $scope.numberOfPages = function() {
          return Math.ceil($scope.data.length / $scope.pageSize);
        };
        for (var i = 0; i < $scope.projectList.length; i++) {
          $scope.projectList[i].countdown = moment($scope.projectList[i].releaseStartTime).diff(moment($scope.serverTime), 'seconds') + 2;
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

    $scope.timeUntil = function(stDate) {
      stDate = stDate - $scope.counter;
      if (stDate === 0) {
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
        }, function() {
          if (response.ret === 1) {
            $scope.projectList = response.data.projectList;
          }
          window.location.reload();
        });
      }
      return moment().startOf('month').seconds(stDate).format('DD') - 1 + '天,' + moment().startOf('month').seconds(stDate).format('HH时,mm分,ss秒');
    };
    $rootScope.selectPage = $location.path().split('/')[1];

  }])
  .directive('projectPagination', function() {
    return {
      restrict: 'AE',
      templateUrl: 'views/partials/_pagination.html'
    };
  });
