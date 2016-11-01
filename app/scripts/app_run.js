/*
* @Author: yuyang
* @Date:   2016-09-13 09:54:32
* @Last Modified by:   yuyang
* @Last Modified time: 2016-09-22 18:07:01
*/

'use strict';
angular.module('hongcaiApp')
  .run(function($templateCache, $rootScope, $location, $window, $http, $state, $modal, DEFAULT_DOMAIN, toaster, config, ipCookie) {
    /**
     * Array 在IE8下没有indexOf 方法。
     */
    if (!Array.prototype.indexOf) {
      Array.prototype.indexOf = function(obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
          if (this[i] === obj) {
            return i;
          }
        }
        return -1;
      };
    }

    $rootScope.reload = function() {
      $state.reload();
    }

    $rootScope.tologin = function(){
      $rootScope.loginModal = $modal({
        scope: $rootScope,
        template: 'views/modal/modal-toLogin.html',
        show: true
      });
    }

    $rootScope.toRealNameAuth = function() {
      // $rootScope.toNotice();
      $rootScope.realNameAuthModal = $modal({
        scope: $rootScope,
        template: 'views/modal/modal-realNameAuth.html',
        show: true
      });
    };

    /**
     * 激活存管通账户
     */
    $rootScope.toActivate = function() {
      var userCenter = $location.path().indexOf('user-center');
      if(config.pay_company === 'cgt' && $rootScope.isLogged ===true &&  $rootScope.realNameAuthState ===1 &&  $rootScope.isActive=== false && userCenter ===1){
        $rootScope.activateModal = $modal({
          scope: $rootScope,
          template: 'views/modal/modal-activate.html',
          show: true
        });
      }
    };

    $rootScope.pay_company = config.pay_company;

    /**
     * 暂停服务弹窗
     */
    $rootScope.toNotice = function() {
      $rootScope.noticeModal = $modal({
        scope: $rootScope,
        template: 'views/modal/alert-notice.html',
        show: true
      });
    };


    /**
     * 不需要显示footer的path
     */
    var notShowFooterRoute = [
      'login',
      'register',
      'activity',
      'novice-guide',
      'register'
    ];

    /**
     * 不需要显示header的path
     */
    var notShowHeaderRoute = [
      'novice-guide',
      'login',
      'register'
    ];



    $rootScope.$on('$stateChangeStart', function(event, toState) {
      var $checkSessionServer = $http.post(DEFAULT_DOMAIN + '/siteUser/checkSession');
      $checkSessionServer.error(function(response) {
          $state.go('update', {'return': $location.path()});
          return;
      }).success(function(response) {


          if (response.ret !== -1 && response.data && response.data.userDetail !== '' && response.data.userDetail.user !== undefined && response.data.userDetail.user !== null) {
            $rootScope.isLogged = true;
            $rootScope.loginUser = response.data.userDetail.user;
            $rootScope.loginName = response.data.userDetail.user.name;
            $rootScope.securityStatus = response.data.securityStatus;
            $rootScope.autoTransfer = response.data.securityStatus.autoTransfer;
            $rootScope.account = response.data.userDetail.account;
            $rootScope.bankCardStatus = response.data.userDetail.bankCardStatus;
            $rootScope.unreadCount = response.data.unreadCount;
            $rootScope.userType = response.data.userDetail.user.type;

            $rootScope.realNameAuthState = response.data.securityStatus.realNameAuthStatus;
            $rootScope.isActive = response.data.securityStatus.userAuth.active;
          } else {
            $rootScope.isLogged = false;
            $rootScope.loginName = '';

            if(!ipCookie('guestId')){
              ipCookie('guestId', $rootScope.uuid(32,16), {
                expires: 1,
                path: '/'
              });
            }

            if(toState.name.indexOf("root.userCenter") !== -1){
              $rootScope.tologin();
              toaster.pop('warning', '对不起，您还未登录，请先登录')
            }
          }

          $rootScope.toActivate();
      });

      $rootScope.isNoviceGuide = false;

      var title = '网贷平台，投资理财平台，投资理财项目-宏财网';
      if (toState.data && toState.data.title) {
        title = toState.data.title + ' - 要理财，上宏财!';
      }
      $rootScope.pageTitle = title;


      // 若存在登录框，则去掉
      if($rootScope.loginModal){
        $rootScope.loginModal.hide();
      }
      if($rootScope.realNameAuthModal){
        $rootScope.realNameAuthModal.hide();
      }

      // $rootScope.toActivate();
    });



    $rootScope.mobileIOS = ($window.navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false);
    /**
     * viewFlAG view层面的显示与否的判断，比如main.html的土豪标图片不显示，在viewFlAG里添加, tuhaoShowFLAG: false (变量注入的是rootScope，FLAG保持全部大写)，然后在main.html做一个ng-show, no-hide的判断即可。
     * ignorePATH route层面的显示与否的判断，比如/lucky-draw抽奖活动咱不对外公布(未上线)，在ignorePATH添加路径/lucky-draw。
     * branch_switch,当该标识关联的功能已开发完成，但并没有对外发布。
     */
    if (config.viewFlAG) {
      angular.forEach(config.viewFlAG, function(value, key) {
        $rootScope[key] = value;
      });
    }


    $rootScope.$on('$stateChangeSuccess', function() {
      /**
       * branch_switch， 当该路由关联的功能已开发完成，但并没有对外发布。
       */
      if (config.ignorePATH && config.ignorePATH.indexOf('/' + $location.path().split('/')[1]) !== -1) {
        $location.path('//');
      }
      /**
       * 跳转HTTPS的全局配置
       */
      if ($location.protocol() === 'http' && config.jumpHttpsPath && config.jumpHttpsPath.indexOf('/' + $location.path().split('/')[1]) !== -1) {
        $window.location.href = 'https://' + $location.absUrl().split('://')[1];
      }

      $rootScope.firstPath = $location.path().split('/')[1];
      if($location.path().split('/')[1].slice(0,$location.path().split('/')[1].indexOf('?')) == 'assignments'){
        $rootScope.firstPath = 'assignments';
      }
      console.log($rootScope.firstPath);
      $rootScope.selectSide = $location.path().split('/')[2];

      $rootScope.act = $location.search().act;
      $rootScope.channelCode = $location.search().f;

      if ($rootScope.channelCode) {
        ipCookie('utm_from', $rootScope.channelCode, {
          expires: 1,
          path: '/'
        });
      }

      if ($rootScope.act) {
        ipCookie('act', $rootScope.act, {
          expires: 1,
          path: '/'
        });
      }

      var showFlag1 = [
          'account-overview',
          'security-settings',
          'bankcard-management'
      ];
      var showFlag2 = [
        'assets-overview',
        'recharge',
        'withdraw',
        'record'
      ];
      var showFlag3 = [
        'credit',
        'investment',
        'reservation',
        'assignments'
      ];
      var showFlag4 = [
        'cash-coupon',
        'experience-money',
        'rate-coupon',
        'invite-rebate'
      ];
      var showFlag5 = [
        'message'
      ];

      $rootScope.userCenterPart = 1;
      if(showFlag1.indexOf($rootScope.selectSide) !== -1){
        $rootScope.userCenterPart = 1;
      }
      if(showFlag2.indexOf($rootScope.selectSide) !== -1){
        $rootScope.userCenterPart = 2;
      }
      if(showFlag3.indexOf($rootScope.selectSide) !== -1){
        $rootScope.userCenterPart = 3;
      }
      if(showFlag4.indexOf($rootScope.selectSide) !== -1){
        $rootScope.userCenterPart = 4;
      }
      if(showFlag5.indexOf($rootScope.selectSide) !== -1){
        $rootScope.userCenterPart = 5;
      }

      $rootScope.showFooter = true;
      if (notShowFooterRoute.indexOf($location.path().split('/')[1]) !== -1) {
        $rootScope.showFooter = false;
      }


      $rootScope.showHeader = true;
      if (notShowHeaderRoute.indexOf($location.path().split('/')[1]) !== -1) {
        $rootScope.showHeader = false;
      }
    });
    
    $rootScope.uuid = function(len, radix){
      var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
      var uuid = [], i;
      radix = radix || chars.length;

      if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
      } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
            r = 0 | Math.random()*16;
            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
          }
        }
      }

      return uuid.join('');
    }

  });
