'use strict';
angular.module('hongcaiApp')
  .controller('RechargeTransferCtrl',
    function ($scope, $state, $rootScope, toaster, $stateParams, UserCenterService, config, PayUtils) {
    var business = $stateParams.business;


    /**
     * /** 更改手机号码
     */
    if (business == 'RESET_MOBILE'){ 
      toaster.pop('warning', '暂不支持');

      // UserCenterService.resetMobile.get({
      //   mobile:$stateParams.mobile
      // }, function(response) {
      //   if (response && response.ret !== -1) {
      //     PayUtils.redToTrusteeship('toResetMobile', response);
      //   } else {
      //     toaster.pop('warning', response.msg);
      //     $state.go('root.userCenter.security-settings');
      //     $rootScope.openTrusteeshipAccount = true;
      //   }
      // });

    } else {
      UserCenterService.yeepayRecharge.get({
        amount: $stateParams.amount
      }, function(response) {
        if (response && response.ret !== -1) {
          PayUtils.redToTrusteeship('toRecharge', response);
        } else {
          // TODO alert是更好的方式，暂且用toaster
          // $scope.msg = response.msg;
          // var alertDialog = $alert({scope: $scope, template: 'views/modal/alert-dialog.html', show: true});
          toaster.pop('warning', response.msg);
          $state.go('root.userCenter.security-settings');
          $rootScope.openTrusteeshipAccount = true;
        }
      });
    }

  });