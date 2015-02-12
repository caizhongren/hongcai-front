'use strict';
angular.module('hongcaiApp')
  .controller('RightsTransferCtrl', ['$rootScope', '$scope', 'toaster', '$stateParams', 'UserCenterService', 'config', '$alert', function ($rootScope, $scope, toaster, $stateParams, UserCenterService, config, $alert) {
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

    if ($stateParams.type === '0') {
      UserCenterService.yeepayRegister.get({
        realName: $stateParams.realName,
        idCardNo: $stateParams.idCardNo
      }, function(response) {
        if (response.ret === 1) {
          var req = response.data.req;
          var sign = response.data.sign;
          var _f = newForm();
          createElements(_f, 'req', req);
          createElements(_f, 'sign', sign);
          _f.action = config.YEEPAY_ADDRESS + 'toRegister';
          _f.submit();
          $rootScope.securityStatus.realNameAuthStatus = 1;
        } else {
          console.log('ask security-settings, why yeepayRegister did not load data...');
        }
      });

    } else if ($stateParams.type === '1') {
      // 调用预约的方法，当预约开通后
      UserCenterService.authorizeAutoTransfer.get({
      }, function(response) {
        if (response.ret === 1) {
          if($rootScope.securityStatus.realNameAuthStatus === 0 || !$rootScope.securityStatus.realNameAuthStatus) {
            $scope.msg = '请先开通托管账户';
            $alert({
              scope: $scope,
              template: 'views/modal/alert-dialog.html',
              show: true
            });
            return;
          }
          var req = response.data.req;
          var sign = response.data.sign;
          var _f = newForm();
          createElements(_f, 'req', req);
          createElements(_f, 'sign', sign);
          _f.action = config.YEEPAY_ADDRESS + 'toAuthorizeAutoTransfer';
          _f.submit();
          // 这块应该如何判断？ TODO
          // 这里实现方法不太好，如果所有的实现都在用户表里面提现，是再好不过的了。
          $scope.openTrustReservation = true;
        } else {
          console.log('ask security-settings, why authorizeAutoTransfer did not load data...');
        }
      });
    }
    
  }]);