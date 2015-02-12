'use strict';
angular.module('hongcaiApp')
  .controller('RechargeTransferCtrl', ['$scope', '$state', '$rootScope', 'toaster', '$stateParams', 'UserCenterService', 'config', function ($scope, $state, $rootScope, toaster, $stateParams, UserCenterService, config) {
    function newForm() {
      var f = document.createElement('form');
      document.body.appendChild(f);
      f.method = 'post';
      // f.target = '_blank';
      return f;
    }

    function createElements(eForm, eName, eValue) {
      var e = document.createElement('input');
      eForm.appendChild(e);
      e.type = 'text';
      e.name = eName;
      if (!document.all) {
        e.style.display = 'none';
      } else {
        e.style.display = 'block';
        e.style.width = '0px';
        e.style.height = '0px';
      }
      e.value = eValue;
      return e;
    }
    
    UserCenterService.yeepayRecharge.get({
      amount: $stateParams.amount
    }, function(response) {
      if (response.ret === 1) {
        var req = response.data.req;
        var sign = response.data.sign;
        var _f = newForm();
        createElements(_f, 'req', req);
        createElements(_f, 'sign', sign);
        _f.action = config.YEEPAY_ADDRESS + 'toRecharge';
        _f.submit();
      } else {
        // TODO alert是更好的方式，暂且用toaster
        // $scope.msg = response.msg;
        // var alertDialog = $alert({scope: $scope, template: 'views/modal/alert-dialog.html', show: true});
        toaster.pop('warning', response.msg);
        $state.go('root.userCenter.security-settings');
        $rootScope.openTrusteeshipAccount = true;
      }
    });

  }]);