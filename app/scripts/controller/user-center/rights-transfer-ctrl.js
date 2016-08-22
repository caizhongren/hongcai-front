'use strict';
angular.module('hongcaiApp')
  .controller('RightsTransferCtrl', function ($rootScope, $scope, toaster, $stateParams, UserCenterService, config, $alert, PayUtils) {

    if ($stateParams.type === '0') {
      UserCenterService.yeepayRegister.get({
        realName: $stateParams.realName,
        idCardNo: $stateParams.idCardNo
      }, function(response) {
        if (response && response.ret !== -1) {
          $rootScope.securityStatus.realNameAuthStatus = 1;
          PayUtils.redToTrusteeship('toRegister', response);
        } else {
          toaster.pop('warning', '提示', response.msg);
        }
      });

    } else if ($stateParams.type === '1') {
      /**
       * 调用预约的方法，当预约开通后
       */
      UserCenterService.authorizeAutoTransfer.get({
      }, function(response) {
        if (response && response.ret !== -1) {
          if($rootScope.securityStatus.realNameAuthStatus === 0 || !$rootScope.securityStatus.realNameAuthStatus) {
            $scope.msg = '请先开通托管账户';
            $alert({
              scope: $scope,
              template: 'views/modal/alert-dialog.html',
              show: true
            });
            return;
          }
          PayUtils.redToTrusteeship('toAuthorizeAutoTransfer', response);
          $scope.openTrustReservation = true;
        } else {
          //console.log('ask security-settings, why authorizeAutoTransfer did not load data...');
        }
      });
    }

  });
