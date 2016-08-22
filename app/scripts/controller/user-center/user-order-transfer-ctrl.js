'use strict';
angular.module('hongcaiApp')
  .controller('UserOrderTransferCtrl', function ($rootScope, $scope, toaster, $stateParams, OrderService, PayUtils) {

    if($stateParams.orderType === '4') {
      OrderService.transferFunds.get({
        projectId: $stateParams.projectId,
        orderId: $stateParams.orderId
      }, function(response) {
        if (response && response.ret !== -1) {
          PayUtils.redToTrusteeship('toTransfer', response);
        } else {
          toaster.pop('warning', response.msg);
        }
      });
    } else {
      OrderService.transfer.get({
        projectId: $stateParams.projectId,
        orderId: $stateParams.orderId
      }, function(response) {
        if (response && response.ret !== -1) {
          PayUtils.redToTrusteeship('toTransfer', response);
        } else {
          toaster.pop('warning', response.msg);
        }
      });
    }

  });