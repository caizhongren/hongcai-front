'use strict';
angular.module('hongcaiApp')
  .controller('AppointmentProjectCtrl', ['$scope', '$stateParams', '$rootScope', '$location', 'ProjectService', 'toaster', function($scope, $stateParams, $rootScope, $location, ProjectService, toaster) {
    var response = ProjectService.appointmentProject.get({}, function() {
      if (response.ret === 1) {
        $scope.project = response.data.project;
        $scope.statusMap = response.data.statusMap;
        $scope.statusText = $scope.statusMap[$scope.project.status];
        console.log(response);

        $scope.project.countdown = moment($scope.project.releaseStartTime).diff(moment(response.data.serverTime), 'seconds') + 2;
        $scope.counter = 0;
        var interval = window.setInterval(function() {
          $scope.counter++;
          $scope._timeDown = $scope.timeUntil($scope.project.countdown);
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
        ProjectService.appointmentProject.get({}, function() {
          if (response.ret === 1) {
            $scope.project = response.data.project;
          }
          window.location.reload();
        });
      }
      return moment().startOf('month').seconds(stDate).format('DD') - 1 + '天,' + moment().startOf('month').seconds(stDate).format('HH时,mm分,ss秒');
    };
    $rootScope.selectPage = $location.path().split('/')[1];
  }]);
