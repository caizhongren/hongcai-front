'use strict';
angular.module('hongcaiApp')
  .controller('InvPlanVerifyCtrl', ['$scope', '$location', '$state', '$rootScope', '$stateParams', '$modal', 'ProjectService', 'SessionService', 'config', '$alert', function($scope, $location, $state, $rootScope, $stateParams, $modal, ProjectService, SessionService, config, $alert) {
    // $scope.giftCount = 0;
    $scope.checkInvFlag = true;
    ProjectService.isFundsAvailableInvest.get({
      projectId: $stateParams.projectId,
      amount: $stateParams.amount,
      isRepeat: $stateParams.isRepeat
    }, function(response) {
      if (response.ret === 1) {
        $scope.project = response.data.projectDetail.fundsProject;
        $scope.fundsProduct = response.data.projectDetail.fundsProduct;
        $scope.investAmount = response.data.amount;
        $scope.capital = response.data.userCapital;
      } else if (response.ret === -1) {
        if (response.code === 1) {
          alert('已经卖光啦！');
        } else {
          alert(response.msg);
        }
        $location.path('project-list/6,7,8,9/0/100/0/100/0/200000000/release_start_time/false');
      }

    });

    $scope.reload = function() {
      window.location.reload();
    };

    $scope.transfer = function(project, investAmount) {
      $scope.msg = '4';
      $scope.investAmount = investAmount;
      $scope.page = 'investVerify';
      $alert({
        scope: $scope,
        template: 'views/modal/alertYEEPAY.html',
        show: true
      });
      window.open('/#!/invplan-verify-transfer/' + project.id + '/' + investAmount + '/' + $stateParams.isRepeat);
    };

    $scope.backTo = function() {
      $location.path('/project/' + $stateParams.projectId);
    };
  }]);
