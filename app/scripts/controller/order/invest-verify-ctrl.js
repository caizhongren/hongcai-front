'use strict';
angular.module('hongcaiApp')
  .controller('investVerifyCtrl', function($scope, $location, $state, $rootScope, $stateParams, $modal, OrderService, SessionService, config, $alert, UserCenterService) {
    $scope.giftCount = 0;
    $scope.checkInvFlag = true;
    OrderService.investVerify.get({
      projectId: $stateParams.projectId,
      amount: $stateParams.amount,
    }, function(response) {
      if (response.ret === 1) {
        $scope.project = response.data.project;
        $scope.capital = response.data.capital;
        $scope.categoryCode = response.data.categoryCode;
        $scope.giftCount = response.data.giftCount;
        $scope.investAmount = $stateParams.amount;
        $scope.payAmount = response.data.payAmount;
        $scope.experienceAmount = response.data.experienceAmount;
        $scope.icons = [];
        for (var i = 0; i <= $scope.giftCount; i++) {
          var obj = {};
          obj.value = '' + i + '';
          obj.label = '' + i + '';
          $scope.icons.push(obj);
        }
        /*for(var i= 0; i <= $scope.giftCount; i++){
            angular.element('.select-area').append('<option value="' + i + '">'+ i +'</option>');
        }*/
      } else if (response.ret === -1) {
        if (response.code === 1) {
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
      }

    });
    // 显示协议
    $scope.showAgreement = function() {
      $modal({
        scope: $scope,
        template: 'views/modal/alert-showLoanSecurityAgreement.html',
        show: true
      });
    };

    $scope.transfer = function(project, investAmount, giftCount, selectCoupon) {
      $scope.msg = '4';
      $scope.investAmount = investAmount;
      $scope.page = 'investVerify';
      var couponNumber = selectCoupon == null ? "" : selectCoupon.number;
      $alert({
        scope: $scope,
        template: 'views/modal/alertYEEPAY.html',
        show: true
      });
      window.open('/#!/invest-verify-transfer/' + project.id + '/' + investAmount + '/' + giftCount + '/' + couponNumber);
    };

    /**
     * 加息券统计信息
     */
    UserCenterService.getUnUsedIncreaseRateCoupons.get({}, function(response) {
      if (response.ret === 1) {
        $scope.increaseRateCoupons = response.data.increaseRateCoupons;
        $scope.selectCoupon = $scope.increaseRateCoupons[0];
      } else {
        toaster.pop('warning', response.msg);
      }
    });

    var myOtherModal = $modal({
      scope: $scope,
      template: 'views/modal/modal-invest-verify.html',
      show: false
    });
    $scope.showModal = function() {
      myOtherModal.$promise.then(myOtherModal.show);
    };

    $scope.changeInvestAmount = function(investAmount) {
      $location.path('/invest-verify/' + $stateParams.projectId + '/' + investAmount);
    };
    $scope.backTo = function() {
      //window.location.href = 'project/' + $stateParams.projectId;
      $location.path('/project/' + $stateParams.projectId);
    };
    $scope.selectedIcon = 1;
    //console.log(typeof($scope.selectedIcon));
  });
