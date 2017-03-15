'use strict';
angular.module('hongcaiApp')
  .controller('UserCenterCtrl', function($location, $scope, $http,$state, $rootScope, $stateParams, UserCenterService, DEFAULT_DOMAIN, ipCookie, $alert) {
    var $checkSessionServer = $http.post(DEFAULT_DOMAIN + '/siteUser/checkSession');
    $checkSessionServer.error(function(response) {
        return;
    }).success(function(response) {
      if(response.data.securityStatus.trusteeshipAccountStatus !==1) {
        ipCookie('openTrusteeshipAccount', true);
      }
    });
    $scope.headImgUrl = '/images/user-center/portrait.png';
    $rootScope.selectPage = $location.path().split('/')[2];
    var timestamp = new Date();
    var welcomeTime = timestamp.getHours();
    if (welcomeTime > 5 && welcomeTime < 9) {
      $scope.welcomeTip = '早安~';
    } else if (welcomeTime >= 9 && welcomeTime <= 11) {
      $scope.welcomeTip = '上午好~';
    } else if (welcomeTime >= 12 && welcomeTime <= 14) {
      $scope.welcomeTip = '中午好~';
    } else if (welcomeTime >= 15 && welcomeTime <= 18) {
      $scope.welcomeTip = '下午好~';
    } else {
      $scope.welcomeTip = '晚安~';
    }

    if(['record', 'assets-overview', 'recharge', 'withdraw'].indexOf($rootScope.selectPage) !== -1){
      // $('#accountInfo').collapse('toggle')
      $('#capitalInfo').addClass('in');
    } else if (['credit', 'investment', 'reservation', 'assignments'].indexOf($rootScope.selectPage) !== -1){
      $('#investInfo').addClass('in');
    } else if (['experienceMoney', 'rate-coupon', 'invite-rebate','cash-coupon'].indexOf($rootScope.selectPage) !== -1){
      $('#rewardInfo').addClass('in');
    } else if (['message'].indexOf($rootScope.selectPage) !== -1){
      $('#sysInfo').addClass('in');
    } else {
      $('#accountInfo').addClass('in');
    }

    /**
    * 账号信息
    **/
    UserCenterService.userSecurityInfo.get({}, function(response) {
      if (response && response.ret !== -1) {
        var userAuth = response.data.userAuth;
        var user = response.data.user;
        $scope.email = user.email;
        $scope.mobile = user.mobile;
        $scope.userId = user.id;
        if (userAuth && userAuth.yeepayAccountStatus === 1) {
          $scope.haveTrusteeshipAccount = true;
          // $scope.openTrustReservation = userAuth.autoTransfer;
        } else {
          $scope.haveTrusteeshipAccount = false;
        }

      } 
    });
    /**
    * 绑卡信息
    **/
    UserCenterService.getUserBankCard.get({}, function(response) {
      if (response.ret === 1) {
        var card = response.data.card;
        if (card) {
          $scope.haveCard = (card.status === 'VERIFIED');
          $scope.isVerifying = (card.status === 'VERIFYING');
          $scope.unbinding = (card.status === 'INIT');
          // ipCookie('resetMobile', true);
        } else {
          $scope.haveCard = false;
        }
        $scope.isAuth = response.data.isAuth;
      } else {
        toaster.pop('error', response.msg);
      }
    });

    //修改手机号
    $scope.resetMobile = function(){
      $state.go('root.userCenter.security-settings');
      if($scope.haveTrusteeshipAccount== true){
        ipCookie('resetMobile', true);
      }else{
        ipCookie('changeMobile',true);
      }
    }
    // 点击开通存管通
    $scope.openTrusteeshipAccount = function(){
      $state.go('');
      ipCookie('openTrusteeshipAccount',true);
    };

    //绑定银行卡
    $scope.bindBankCard = function() {
      // $rootScope.toNotice();
      $scope.msg = '5';
      $alert({
        scope: $scope,
        template: 'views/modal/alertYEEPAY.html',
        show: true
      });
      window.open('/#!/bankcard-transfer/0');
    };
      var image = angular.element(document.querySelector('#cropImg>img'));
      var saveBtn = $('.avatar-btns>.avatar-save')
      $scope.submit = function() {
          var type = image.attr('src').split(';')[0].split(':')[1];
          var canVas = image.cropper("getCroppedCanvas", {});
          //将裁剪的图片加载到face_image
          $('#face_image').attr('src', canVas.toDataURL());
          canVas.toBlob(function(blob) {
              var formData = new FormData();
              formData.append("file", blob, fileName);

              $.ajax({
                  type: "POST",
                  url: '/sys/file/uploadImage.do',
                  data: formData,
                  contentType: false, //必须
                  processData: false, //必须
                  dataType: "json",
                  success: function(retJson){
                      //清空上传文件的值
                      $('#avatarInput').val('');

                      //上传成功
                      console.log('retJson:', retJson);
                  },
                  error : function() {
                      //清空上传文件的值
                      $(_pageId + '#btn1').val('');
                  }
              });
          }, type);
      };
      $scope.cancle = function(){
        //取消
          console.log(1);
           //清空上传文件的值
          $(_pageId + inputFileId).val('');
        
      }

        

  });
