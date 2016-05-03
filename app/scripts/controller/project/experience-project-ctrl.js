'use strict';
angular.module('hongcaiApp')
  .controller('ExperienceProjectCtrl', function($scope, $state, $rootScope, ProjectService, OrderService, $alert, toaster) {

    $scope.getExperienceProjectDetails = function() {
      var projectDetails = ProjectService.getExperienceProjectDetail.get({}, function() {
        if (projectDetails.ret === 1) {
          $scope.project = projectDetails.data.project;
          $scope.investCount = projectDetails.data.investCount;
        } else {
          toaster.pop('warning', projectDetails.msg);
        }
      });
    };

    $scope.getExperienceProjectDetails();

    //投资
    $scope.showMsg = false;
    $scope.quickInvest = function(){
      if($rootScope.securityStatus.trusteeshipAccountStatus === 1){
        if($scope.account.experienceAmount > 100){
          OrderService.saveExperienceMoneyOrder.get({
            amount: $rootScope.account.experienceAmount,
            number: $scope.project.number,
            isRepeat: 2,
            payAmount : 0
          }, function(response) {
            if (response.ret === 1) {
              var creditRightNum = response.data.creditRightNum;

              if(creditRightNum !== null && creditRightNum !== undefined) {
                $state.go('root.yeepay-callback', {
                  business: 'EXPERIENCE',
                  status: 'SUCCESS',
                  amount: $rootScope.account.experienceAmount,
                  number: creditRightNum
                });
              } else{
                $scope.showMsg = true;
                $scope.msg = response.msg;
              }
            } else {
              $scope.showMsg = true;
              $scope.msg = response.msg;
            }
          });
        }else{
          $scope.showMsg = true;
          $scope.msg = '体验金小于100元，无法投资体验金新手标';
        }
      }else{
        $scope.toRealNameAuth();
      }
    }

    // 完善资料
    $scope.toRealNameAuth = function() {
      $alert({
        scope: $scope,
        template: 'views/modal/alert-perfectinformation.html',
        show: true
      });
    };
  });
