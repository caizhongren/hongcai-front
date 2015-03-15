'use strict';
angular.module('hongcaiApp')
  .controller('InvPlanVerifyCtrl', ['$scope', '$location', '$state', '$rootScope', '$stateParams', '$modal', 'ProjectService', 'SessionService', 'config', '$alert', function($scope, $location, $state, $rootScope, $stateParams, $modal, ProjectService, SessionService, config, $alert) {
    $scope.checkInvFlag = true;
    ProjectService.isFundsAvailableInvest.get({
      projectId: $stateParams.projectId,
      amount: $stateParams.amount,
      isRepeat: $stateParams.isRepeat
    }, function(response) {
      if (response.ret === 1) {
        $scope.project = response.data.projectDetail.fundsProject;
        $scope.project.isRepeatFlag = true ? ($stateParams.isRepeat === '1') : ($stateParams.isRepeat !== '1');
        $scope.fundsProduct = response.data.projectDetail.fundsProduct;
        $scope.investAmount = response.data.amount;
        $scope.capital = response.data.userCapital;
      } else if (response.ret === -1) {
        if (response.code === -1027) {
          $scope.msg = '抱歉，已经卖光了。';
          $modal({
            scope: $scope,
            template: 'views/modal/alert-dialog.html',
            show: true
          });
        } else {
          $scope.msg = response.msg;
          $modal({
            scope: $scope,
            template: 'views/modal/alert-dialog.html',
            show: true
          });
        }
        // $location.path('project-list/6,7,8,9/0/100/0/100/0/200000000/release_start_time/false');
      }

    });

    // 跳到授权页面
    $scope.toAutoTransfer = function() {
      $modal({
        scope: $scope,
        template: 'views/modal/modal-toAutoTransfer.html',
        show: true
      });
    };

    $scope.checkAutoTransfer = function(project) {
      if ($rootScope.securityStatus.autoTransfer !== 1) {
        project.isRepeatFlag = false;
        $scope.toAutoTransfer();
      }
    };

    $scope.reload = function() {
      window.location.reload();
    };

    // 显示协议
    $scope.showAgreement = function() {
      $modal({
        scope: $scope,
        template: 'views/modal/alert-toinvPlanAgreement.html',
        show: true
      });
    };

    $scope.transfer = function(project, investAmount) {
      if (project.isRepeatFlag && $rootScope.autoTransfer === 1) {
        $scope.isRepeat = 1;
      } else {
        $scope.isRepeat = 2;
      }
      $scope.msg = '4';
      $scope.investAmount = investAmount;
      $scope.page = 'investVerify';
      $alert({
        scope: $scope,
        template: 'views/modal/alertYEEPAY.html',
        show: true
      });
      window.open('/#!/invplan-verify-transfer/' + project.id + '/' + investAmount + '/' + $scope.isRepeat);
    };

    $scope.backTo = function() {
      $location.path('/project/' + $scope.project.number);
    };
  }]);
