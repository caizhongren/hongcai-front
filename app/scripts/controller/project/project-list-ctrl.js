'use strict';
angular.module('hongcaiApp')
  .controller('ProjectListCtrl', ['$scope', '$stateParams', '$rootScope', '$location', 'ProjectService', 'toaster', function($scope, $stateParams, $rootScope, $location, ProjectService, toaster) {
    $scope.sortType = $stateParams.sortType || false;
    if ($scope.sortType === 'true') {
      $scope.sortType = true;
    } else {
      $scope.sortType = false;
    }
    $scope.toggleSort = function() {
      $scope.sortType = !$scope.sortType;
    };
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
        // console.log($scope.projectList);
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
      // function z(n) {
      //   return (n < 10 ? '0' : '') + n;
      // }
      // var d = new Date(stDate);
      // var diff = d - new Date();
      // var sign = diff < 0 ? '-' : '';
      // diff = Math.abs(diff);
      // var days = diff / 3.6e6 / 24 | 0;
      // var hours = (diff - days*3.6e6*24) / 3.6e6 | 0;
      // var mins = diff % 3.6e6 / 6e4 | 0;
      // var secs = Math.round(diff % 6e4 / 1e3);
      // return sign + days + '天,' + z(hours) + '时,' + z(mins) + '分,' + z(secs) + '秒';
    };
    $rootScope.selectPage = $location.path().split('/')[1];
  }]);
