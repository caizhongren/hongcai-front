'use strict';
angular.module('hongcaiApp')
  .controller('InviteRebateCtrl', ['$scope', '$state', '$rootScope', 'UserCenterService', '$alert', function($scope, $state, $rootScope, UserCenterService, $alert) {
    $rootScope.selectSide = 'invite-rebate';
    UserCenterService.getInviteList.get(function(response) {
      if (response.ret === 1) {
        $scope.voucher = response.data.voucher;
        $scope.inviteCode = response.data.voucher.inviteCode;
        $scope.inviteList = response.data.inviteList;
        $scope.currentPage = 0;
        $scope.pageSize = 6;
        $scope.data = [];
        $scope.copyUrl = 'https://www.hongcai.com/#!/register-mobile/' + $scope.inviteCode;
        $scope.numberOfPages = function() {
          return Math.ceil($scope.data.length / $scope.pageSize);
        };
        for (var i = 0; i < $scope.inviteList.length; i++) {
          $scope.data.push($scope.inviteList[i]);
        }
      } else {
        console.log('ask invite-rebate, why getInviteList did not load data...');
      }
    });

    $scope.showMessage = function() {
      $scope.msg = '邀请链接已经复制到剪切板，赶快复制（Ctrl+V）给您的好友，一起在宏财理财吧！';
      $alert({
        scope: $scope,
        template: 'views/modal/alert-dialog.html',
        show: true
      });
    };
  }]);
