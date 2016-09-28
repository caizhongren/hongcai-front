'use strict';
angular.module('hongcaiApp')
  .controller('InviteRebateCtrl', function($scope, $state, $rootScope, UserCenterService, $alert, ShareUtils, VouchersService, ngClipboard, toaster, config) {
    VouchersService.getInviteList.get(function(response) {
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

        $scope.inviteUrl = "http://www.hongcai.com/register?inviteCode=" + response.data.voucher.inviteCode;

      } else {
        //console.log('ask invite-rebate, why getInviteList did not load data...');
      }

      // 生成自己的二维码
      $('#qrcode').qrcode({
        render:'table',
        text:'http://m.test321.hongcai.com/register?inviteCode=' + $scope.inviteCode,
        size: 150
      });
    });

    VouchersService.inviteStat.get(function(response){
      if (response.ret === 1){
        $scope.inviteStat = response.data.inviteStat;
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


    /**
     * 复制邀请链接
     */
    $scope.copyInviteUrl = function(){
      ngClipboard.toClipboard('http://www.hongcai.com/register?inviteCode=' + $scope.inviteCode);
      toaster.pop('success', '复制成功！');
    }
    /**
     * 分享到微博
     */
    $scope.shareWeibo = function(){

      var shareLink = config.domain + "/register?inviteCode=" + $scope.inviteCode;
      ShareUtils.toWeibo('点击注册，得68888体验金 ' + shareLink);


    }


    /**
     * 分享到qqzone
     */
    $scope.shareQQ = function(){
      var shareLink = config.domain + "/register?inviteCode=" + $scope.inviteCode;
      var desc = "点击注册，得68888体验金" + shareLink;

      ShareUtils.toQQzone('点击注册，得68888体验金', shareLink, desc);

    }


    $scope.wechatQrCode = config.en ==='online' ?  '/images/user-center/wechat.png' : '/images/user-center/wechat-test.png'



  });
