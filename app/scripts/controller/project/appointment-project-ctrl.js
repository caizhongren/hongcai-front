'use strict';
angular.module('hongcaiApp')
  .controller('AppointmentProjectCtrl', ['$scope', '$stateParams', '$rootScope', '$location', 'ProjectService', 'toaster', function($scope, $stateParams, $rootScope, $location, ProjectService, toaster) {
    var response = ProjectService.appointmentProject.get({}, function() {
      if (response.ret === 1) {
        $scope.project = response.data.project;
        console.log(response);
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
