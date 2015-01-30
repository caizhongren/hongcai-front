'use strict';
angular.module('hongcaiApp')
  .controller('AppointmentProjectCtrl', ['$scope', '$stateParams', '$rootScope', '$location', 'ProjectService', 'toaster', '$timeout', function($scope, $stateParams, $rootScope, $location, ProjectService, toaster, $timeout) {
    var response = ProjectService.appointmentProject.get({}, function() {
      if (response.ret === 1) {
        $scope.project = response.data.project;
        $scope.baseFileUrl = response.data.baseFileUrl;
        $scope.statusMap = response.data.statusMap;
        $scope.statusText = $scope.statusMap[$scope.project.status];
        $scope.repaymentTypeMap = response.data.repaymentTypeMap;
        $scope.repaymentName = $scope.repaymentTypeMap[$scope.project.repaymentType];
        $scope.statSecond = moment($scope.project.releaseStartTime).diff(moment(response.data.serverTime), 'seconds') + 2;
        $scope.onTimeout = function() {
          $scope.statSecond--;
          mytimeout = $timeout($scope.onTimeout, 1000);
          $scope.statDay = moment().startOf('month').seconds($scope.statSecond).format('DD') - 1 + '天,';
          $scope.statTime = moment().startOf('month').seconds($scope.statSecond).format('HH时,mm分,ss秒');
          if ($scope.statSecond === 0) {
            ProjectService.projectDetails.get({
              number: $stateParams.number
            }, function(response) {
              if (response.ret === 1) {
                $scope.project = response.data.project;
              }
            });
            window.location.reload();
          }
        };
        var mytimeout = $timeout($scope.onTimeout, 1000);
        $scope.$on('$stateChangeStart', function() {
          $timeout.cancel(mytimeout);
        });
        //     $scope.counter = 0;
        //     var interval = window.setInterval(function() {
        //       $scope.counter++;
        //       $scope._timeDown = $scope.timeUntil($scope.project.countdown);
        //       $scope.$apply();
        //     }, 1000);

        //     $scope.$on('$stateChangeStart', function() {
        //       clearInterval(interval);
        //     });
      } else {
        $scope.data = [];
        toaster.pop('warning', '服务器正在努力的加载....请稍等。');
        console.log('ask project-list, why projectList did not load data...');
      }
    });

    // $scope.timeUntil = function(stDate) {
    //   stDate = stDate - $scope.counter;
    //   if (stDate === 0) {
    //     ProjectService.appointmentProject.get({}, function() {
    //       if (response.ret === 1) {
    //         $scope.project = response.data.project;
    //       }
    //       window.location.reload();
    //     });
    //   }
    //   return moment().startOf('month').seconds(stDate).format('DD') - 1 + '天,' + moment().startOf('month').seconds(stDate).format('HH时,mm分,ss秒');
    // };
    $rootScope.selectPage = $location.path().split('/')[1];
  }]);
