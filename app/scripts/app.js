'use strict';
/**
 * @ngdoc overview
 * @name hongcaiApp
 * @description
 * #
 * 宏财JS库依赖以及程序路由主配置文件
 */

var hongcaiApp = angular.module('hongcaiApp', [
  'ngAnimate',
  'ngSanitize',
  'mgcrea.ngStrap',
  'ui.router',
  'ui.slider',
  'ngResource',
  'angularMoment',
  'toaster',
  'chart.js',
  'placeholders',
  'angular-loading-bar',
  'bardo.directives',
  'config',
  'sticky',
  'ipCookie',
  'angular-md5',
  'textAngular',
  'angular-google-analytics',
  'bgf.paginateAnything',
  'angular-svg-round-progress',
  'seo'
]);

hongcaiApp
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.includeBar = true;
  }])
  // .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  // $locationProvider.html5Mode(true);
  // $routeProvider.when 'carousel-example-generic';
  // }])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$uiViewScrollProvider', '$httpProvider', 'AnalyticsProvider', '$sceDelegateProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $uiViewScrollProvider, $httpProvider, AnalyticsProvider, $sceDelegateProvider) {
    $uiViewScrollProvider.useAnchorScroll();

    var $http, interceptor = ['$q', '$injector', function($q, $injector) {
      var error;

      function success(response) {
        $http = $http || $injector.get('$http');
        var $timeout = $injector.get('$timeout');
        var $rootScope = $injector.get('$rootScope');
        if ($http.pendingRequests.length < 1) {
          $timeout(function() {
            if ($http.pendingRequests.length < 1) {
              $rootScope.htmlReady();
            }
          }, 700); //an 0.7 seconds safety interval, if there are no requests for 0.7 seconds, it means that the app is through rendering
        }
        return response;
      }

      function error(response) {
        $http = $http || $injector.get('$http');

        return $q.reject(response);
      }

      return function(promise) {
        return promise.then(success, error);
      }
    }];

    $httpProvider.responseInterceptors.push(interceptor);

    $stateProvider
      .state('root', {
        abstract: true,
        views: {
          '': {
            templateUrl: 'views/root.html'
          },
          'header': {
            templateUrl: 'views/header.html',
            controller: 'LoginCtrl',
            controllerUrl: 'scripts/controller/user-center/login-ctrl'
          },
          'footer': {
            templateUrl: 'views/footer.html'
              /*,
                          controller: 'FooterCtrl',
                          controllerUrl: 'scripts/controller/main/footer-ctrl'*/
              //隐藏放假公告弹窗
          },
          'service': {
            templateUrl: 'views/service.html',
            controller: 'ServiceCtrl',
            controllerUrl: 'scripts/controller/main/service-ctrl'
          }
        }
      })
      .state('root.main', {
        url: '/',
        views: {
          '': {
            //templateUrl: 'views/main.html',
            templateUrl: 'views/main-new.html',
            controller: 'MainCtrl',
            controllerUrl: 'scripts/controller/main/main-ctrl'
          },
          'slider': {
            templateUrl: 'views/slider.html',
            controller: 'SliderCtrl',
            controllerUrl: 'scripts/controller/main/slider-ctrl'
          },
          /*'sponsor': {
        templateUrl: 'views/project/project-sponsor-list.html',
        controller: 'GuaranteeListCtrl',
        controllerUrl: 'scripts/controller/enterprise/guarantee-list-ctrl'
      }*/
        }
      })
      .state('root.mainRedirect', {
        url: '/third/:from',
        views: {
          '': {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerUrl: 'scripts/controller/main/main-ctrl'
          },
          'slider': {
            templateUrl: 'views/slider.html',
            controller: 'SliderCtrl',
            controllerUrl: 'scripts/controller/main/slider-ctrl'
          },
          /*'sponsor': {
            templateUrl: 'views/project/project-sponsor-list.html',
            controller: 'GuaranteeListCtrl',
            controllerUrl: 'scripts/controller/enterprise/guarantee-list-ctrl'
          }*/
        }
      })
      .state('root.login', {
        url: '/login?redirectUrl',
        views: {
          '': {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            controllerUrl: 'scripts/controller/user-center/login-ctrl'
          }
        },
        data: {
          title: '登录'
        }
      })
      /**
       * 平台用户的登陆入口
       */
      .state('root.pLogin', {
        url: '/p',
        views: {
          '': {
            templateUrl: 'views/p-login.html',
            controller: 'LoginCtrl',
            controllerUrl: 'scripts/controller/user-center/login-ctrl'
          }
        }
      })
      //注册改版
      .state('root.register',{
        url: '/register?inviteCode',
        views:{
          '':{
            templateUrl:'views/register/register-new.html',
            controller: 'RegisterMobileCtrl',
            controllerUrl: 'scripts/controller/register/register-mobile-ctrl'
          }
        }
      })
      .state('root.register-bind',{
        url: '/register-bind',
        views:{
          '':{
            templateUrl:'views/register/register-bind.html',
            controller: 'SecuritySettingsCtrl',
            controllerUrl: 'scripts/controller/user-center/security-settings-ctrl'
          }
        }
      })


      .state('root.registerMobile', {
        url: '/register-mobile/:inviteCode',
        views: {
          '': {
            templateUrl: 'views/register/register-mobile.html',
            controller: 'RegisterMobileCtrl',
            controllerUrl: 'scripts/controller/register/register-mobile-ctrl'
          }
        }
      })
      .state('root.registerMail', {
        url: '/register-mail/:inviteCode',
        views: {
          '': {
            templateUrl: 'views/register/register-mail.html',
            controller: 'RegisterMailCtrl',
            controllerUrl: 'scripts/controller/register/register-mail-ctrl'
          }
        }
      })
      .state('root.newbie-guide', {
        url: '/newbie-guide',
        views: {
          '': {
            templateUrl: 'newbie-guide.html',
            controller: 'RegisterMailCtrl',
            controllerUrl: 'scripts/controller/register/register-mail-ctrl'
          }
        }
      })
      .state('root.nofound-page', {
        url: '/nofound-page',
        views: {
          '': {
            templateUrl: 'views/nofound-page.html',
            controller: 'NoFoundCtrl',
            controllerUrl: 'scripts/controller/register/no-found-ctrl'
          }
        }
      })
      /*----------------------  banner  -------------------------*/
      .state('root.banner-fourty', {
        url: '/banner-fourty',
        views: {
          '': {
            templateUrl: 'views/banner/banner-fourty.html'
          }
        }
      })
      .state('root.banner-nine', {
        url: '/banner-nine',
        views: {
          '': {
            templateUrl: 'views/banner/banner-nine.html'
          }
        }
      })
      .state('root.banner-P2B', {
        url: '/banner-P2B',
        views: {
          '': {
            templateUrl: 'views/banner/banner-P2B.html'
          }
        }
      })

      // 宏金盈介绍页
      .state('root.banner-investmentplan', {
        url: '/banner-investmentplan',
        views: {
          '': {
            templateUrl: 'views/banner/banner-investmentplan.html',
            controller: 'BannerInvPlanCtrl',
            controllerUrl: 'scripts/controller/main/banner-investmentplan-ctrl'
          }
        }
      })
      .state('root.banner-investmentplan-div', {
        url: '/banner-investmentplan/:anchor',
        views: {
          '': {
            templateUrl: 'views/banner/banner-investmentplan.html',
            controller: 'BannerInvPlanCtrl',
            controllerUrl: 'scripts/controller/main/banner-investmentplan-ctrl'
          }
        }
      })
      .state('root.banner-partner', {
        url: '/banner-partner',
        views: {
          '': {
            templateUrl: 'views/banner/banner-partner.html'
          }
        }
      })
      .state('root.friends-ship', {
        url: '/friends',
        views: {
          '': {
            templateUrl: 'views/banner/friends-ship.html',
            controller: 'FriendLinkCtrl',
            controllerUrl: 'scripts/controller/banner/friend-link-ctrl'
          }
        }
      })
      .state('root.send-email', {
        url: '/send-email-success',
        views: {
          '': {
            templateUrl: 'views/register/send-email.html'
          }
        }
      })
      .state('root.active-email', {
        url: '/active-email?etoken',
        views: {
          '': {
            templateUrl: 'views/register/active-email.html',
            controller: 'ActiveEmailCtrl',
            controllerUrl: 'scripts/controller/register/active-email-ctrl'
          }
        }
      })
      .state('root.register-success', {
        url: '/register-success/:etoken',
        views: {
          '': {
            templateUrl: 'views/success.html',
            controller: 'RegisterSuccessCtrl',
            controllerUrl: 'scripts/controller/register/register-success-ctrl'
          }
        }
      })
      .state('root.register-mobile-success', {
        url: '/register-mobile-success',
        views: {
          '': {
            templateUrl: 'views/success.html',
            controller: 'RegisterMobileSuccessCtrl',
            controllerUrl: 'scripts/controller/register/register-mobile-success-ctrl'
          }
        }
      })

    // 易宝网页操作回调页，包括开通易宝、充值、提现、绑卡、取消绑卡、投资
    .state('root.yeepay-callback', {
      url: '/yeepay-callback/:business/:status?amount&number&profit',
      views: {
        '': {
          templateUrl: 'views/success.html',
          controller: 'YeepaySuccessCtrl',
          controllerUrl: 'scripts/controller/user-center/yeepay-success-ctrl'
        }
      }
    })

    /*-------------  toYeepay transfer --------------------*/
    .state('root.recharge-transfer', {
        url: '/recharge-transfer/:amount',
        views: {
          '': {
            templateUrl: 'views/transfer.html',
            controller: 'RechargeTransferCtrl',
            controllerUrl: 'scripts/controller/user-center/recharge-transfer-ctrl'
          }
        }
      })
      .state('root.rights-transfer', {
        url: '/righs-transfer/:realName/:idCardNo/:type',
        views: {
          '': {
            templateUrl: 'views/transfer.html',
            controller: 'RightsTransferCtrl',
            controllerUrl: 'scripts/controller/user-center/rights-transfer-ctrl'
          }
        }
      })
      .state('root.withdraw-transfer', {
        url: '/withdraw-transfer/:amount/:captcha',
        views: {
          '': {
            templateUrl: 'views/transfer.html',
            controller: 'WithdrawTransferCtrl',
            controllerUrl: 'scripts/controller/user-center/withdraw-transfer-ctrl'
          }
        }
      })
      .state('root.bankcard-transfer', {
        url: '/bankcard-transfer/:type',
        views: {
          '': {
            templateUrl: 'views/transfer.html',
            controller: 'BankcardTransferCtrl',
            controllerUrl: 'scripts/controller/user-center/bankcard-transfer-ctrl'
          }
        }
      })
      .state('root.invest-verify-transfer', {
        url: '/invest-verify-transfer/:projectId/:investAmount/:giftCount/:couponNumber',
        views: {
          '': {
            templateUrl: 'views/transfer.html',
            controller: 'InvestVerifyTransferCtrl',
            controllerUrl: 'scripts/controller/order/invest-verify-transfer-ctrl'
          }
        }
      })
      .state('root.invplan-verify-transfer', {
        url: '/invplan-verify-transfer/:projectId/:amount/:isRepeat/:payAmount/:couponNumber',
        views: {
          '': {
            templateUrl: 'views/transfer.html',
            controller: 'InvPlanVerifyTransferCtrl',
            controllerUrl: 'scripts/controller/order/invplan-verify-transfer-ctrl'
          }
        }
      })
      .state('root.user-order-transfer', {
        url: '/user-order-transfer/:projectId/:orderId/:orderType',
        views: {
          '': {
            templateUrl: 'views/transfer.html',
            controller: 'UserOrderTransferCtrl',
            controllerUrl: 'scripts/controller/user-center/user-order-transfer-ctrl'
          }
        }
      })
      .state('root.transfer-transfer', {
        url: '/transfer-transfer/:transferAmount',
        views: {
          '': {
            templateUrl: 'views/transfer.html',
            controller: 'TransferTransferCtrl',
            controllerUrl: 'scripts/controller/user-center/transfer-transfer-ctrl'
          }
        }
      })

    // 修改手机号码
    .state('root.yeepay', {
        url: '/yeepay/:business/:mobile',
        views: {
          '': {
            templateUrl: 'views/transfer.html',
            controller: 'RechargeTransferCtrl',
            controllerUrl: 'scripts/controller/user-center/recharge-transfer-ctrl'
          }
        }
      })
      /*-------------  lucky-draw  ---------------------------*/
      // 土豪活动，暂时不上线。
      .state('root.lucky-draw', {
        url: '/lucky-draw',
        views: {
          '': {
            templateUrl: 'views/activity/lucky-draw.html',
            controller: 'LuckyDrawCtrl',
            controllerUrl: 'scripts/controller/activity/lucky-draw-ctrl'
          }
        }
      })
      /*-------------  苏宁推广活动   ----------------------*/
      .state('root.suning-corp', {
        url: '/suning-corp',
        views: {
          '': {
            templateUrl: 'views/activity/suning-corp.html',
            controller: 'LoadPageCtrl',
            controllerUrl: 'scripts/controller/main/load-page-ctrl'
          }
        }
      })

    .state('root.suning-success', {
      url: '/suning-success/:SuccessStatus',
      views: {
        '': {
          templateUrl: 'views/suning-success.html',
          controller: 'SuningSuccessCtrl',
          controllerUrl: 'scripts/controller/main/suning-success-ctrl'
        }
      }
    })

    /*---------  user-center  ------------------------*/
    .state('root.userCenter', {
        'url':'/user-center',
        abstract: false,
        views: {
          'user-center': {
            templateUrl: 'views/user-center/user-center.html'
          },
          'sidebar': {
            templateUrl: 'views/user-center/sidebar.html',
            controller: 'UserCenterCtrl',
            controllerUrl: 'scripts/controller/user-center-ctrl'
          }
        }
      })
      .state('root.userCenter.account-overview', {
        url: '/account-overview',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/account-overview.html',
            controller: 'AccountOverviewCtrl',
            controllerUrl: 'scripts/controller/user-center/account-overview-ctrl'
          }
        },
        data: {
          title: '账户总览'
        }
      })
      .state('root.userCenter.assets-overview', {
        url: '/assets-overview',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/assets-overview.html',
            controller: 'AssetsOverviewCtrl',
            controllerUrl: 'scripts/controller/user-center/assets-overview-ctrl'
          }
        },
        data: {
          title: '资产总览'
        }
      })
      .state('root.userCenter.bankcard-management', {
        url: '/bankcard-management',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/bankcard-management.html',
            controller: 'BankCardManagementCtrl',
            controllerUrl: 'scripts/controller/user-center/bankcard-management-ctrl'
          }
        },
        data: {
          title: '银行卡管理'
        }
      })
      .state('root.userCenter.security-settings', {
        url: '/security-settings',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/security-settings.html',
            controller: 'SecuritySettingsCtrl',
            controllerUrl: 'scripts/controller/user-center/security-settings-ctrl'
          }
        },
        data: {
          title: '安全设置'
        }
      })
      .state('root.userCenter.recharge', {
        url: '/recharge',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/recharge.html',
            controller: 'RechargeCtrl',
            controllerUrl: 'scripts/controller/user-center/recharge-ctrl'
          }
        },
        data: {
          title: '充值'
        }
      })
      .state('root.userCenter.withdraw', {
        url: '/withdraw',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/withdraw.html',
            controller: 'WithdrawCtrl',
            controllerUrl: 'scripts/controller/user-center/withdraw-ctrl'
          }
        },
        data: {
          title: '提现'
        }
      })

    // 资金流水
    .state('root.userCenter.record', {
        url: '/record',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/record.html',
            controller: 'UserDealCtrl',
            controllerUrl: 'scripts/controller/user-center/user-deal-ctrl'
          }
        },
        data: {
          title: '资金流水'
        }
      })
      .state('root.userCenter.investment', {
        url: '/investment',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/investment.html',
            controller: 'UserOrderCtrl',
            controllerUrl: 'scripts/controller/user-center/user-order-ctrl'
          }
        },
        data: {
          title: '我的订单'
        }
      })

    .state('root.userCenter.gift-rebate', {
        url: '/gift-rebate/:type',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/gift-rebate.html',
            controller: 'UserGiftCtrl',
            controllerUrl: 'scripts/controller/user-center/user-gift-ctrl'
          }
        }
      })
      .state('root.userCenter.gift-rebate-query', {
        url: '/gift-rebate/:type/:dateInterval/:status',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/gift-rebate.html',
            controller: 'UserGiftCtrl',
            controllerUrl: 'scripts/controller/user-center/user-gift-ctrl'
          }
        }
      })
      .state('root.userCenter.gift-overview', {
        url: '/gift-overview',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/gift-overview.html',
            controller: 'GiftOverviewCtrl',
            controllerUrl: 'scripts/controller/user-center/gift-overview-ctrl'
          }
        }
      })
      .state('root.userCenter.invite-rebate', {
        url: '/invite-rebate',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/invite-rebate.html',
            controller: 'InviteRebateCtrl',
            controllerUrl: 'scripts/controller/user-center/invite-rebate-ctrl'
          }
        }
      })

    .state('root.userCenter.message', {
      url: '/message/:status',
      views: {
        'user-center-right': {
          templateUrl: 'views/user-center/message.html',
          controller: 'MessageCtrl',
          controllerUrl: 'scripts/controller/user-center/message-ctrl'
        }
      }
    })

    // 预约订单
    .state('root.userCenter.reservation', {
      url: '/reservation',
      views: {
        'user-center-right': {
          templateUrl: 'views/user-center/reservation.html',
          controller: 'ReservationCtrl',
          controllerUrl: 'scripts/controller/user-center/reservation-ctrl'
        }
      },
      data: {
        title: '预约记录'
      }
    })

    // 体验金（个人中心）
    .state('root.userCenter.experienceMoney', {
      url: '/experience-money',
      views: {
        'user-center-right': {
          templateUrl: 'views/user-center/experience-money.html',
          controller: 'ExperienceMoneyCtrl',
          controllerUrl: 'scripts/controller/user-center/experience-money-ctrl'
        }
      },
      data: {
        title: '体验金'
      }
    })

    // 加息券（个人中心）
    .state('root.userCenter.rate-coupon', {
      url: '/rate-coupon',
      views: {
        'user-center-right': {
          templateUrl: 'views/user-center/rate-coupon.html',
          controller: 'IncreaseCouponCtrl',
          controllerUrl: 'scripts/controller/user-center/increase-coupon-ctrl'
        }
      },
      data: {
        title: '加息券'
      }
    })

    // 我的债权（个人中心）
    .state('root.userCenter.credit', {
      url: '/credit/:searchStatus',
      views: {
        'user-center-right': {
          templateUrl: 'views/user-center/credit.html',
          controller: 'CreditCtrl',
          controllerUrl: 'scripts/controller/user-center/credit-ctrl'
        }
      },
      data: {
        title: '我的债权'
      }
    })

    // 宏金宝债权详情
    .state('root.userCenter.credit-security-details', {
      url: '/credit-security-details/:type/:number',
      views: {
        'user-center-right': {
          templateUrl: 'views/user-center/credit-security-details.html',
          controller: 'CreditSecurityCtrl',
          controllerUrl: 'scripts/controller/user-center/credit-security-details-ctrl.js'
        }
      },
      data: {
        title: '债权详情'
      }
    })

    // 宏金盈债权详情
    .state('root.userCenter.credit-profit-details', {
        url: '/credit-profit-details/:type/:number',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/credit-profit-details.html',
            controller: 'CreditProfitCtrl',
            controllerUrl: 'scripts/controller/user-center/credit-profit-details-ctrl.js'
          }
        },
        data: {
          title: '债权详情'
        }
      })
      .state('root.userCenter.credit-query', {
        url: '/credit/:dateInterval/:type',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/credit.html',
            controller: 'CreditCtrl',
            controllerUrl: 'scripts/controller/user-center/credit-ctrl'
          }
        }
      })
      .state('root.userCenter.credit-create', {
        url: '/credit-create/:number',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/credit-create.html',
            controller: 'CreditCreateCtrl',
            controllerUrl: 'scripts/controller/user-center/credit-create-ctrl'
          }
        }
      })


    .state('root.reservation-success', {
        url: '/reservation-success/:status',
        views: {
          '': {
            templateUrl: 'views/success.html',
            controller: 'ReservationSuccessCtrl',
            controllerUrl: 'scripts/controller/user-center/reservation-success-ctrl'
          }
        }
      })
      /*----------  yeepay  ---------------------*/

    .state('app-yeepay-callback', {
      url: '/app-yeepay-register-callback',
      views: {
        '': {
          templateUrl: 'views/wireless/register_ok_callback.html'
        }
      }
    })

    /*--------------------  project  ------------------------*/
    .state('root.project-category', {
        url: '/project-category',
        views: {
          '': {
            templateUrl: 'views/project/project-category.html',
            controller: 'ProjectCategoryCtrl',
            controllerUrl: 'scripts/controller/project/project-category-ctrl'
          }
        }
      })
      .state('root.project-activity-group', {
        url: '/project-activity-group',
        views: {
          '': {
            templateUrl: 'views/project/project-activity-group.html',
            controller: 'ProjectActivityGroupCtrl',
            controllerUrl: 'scripts/controller/project/project-activity-group-ctrl'
          }
        }
      })
      .state('root.guaranteepro-list-query', {
        url: '/guaranteepro-list/:status/:minCycle/:maxCycle/:minEarning/:maxEarning/:minTotalAmount/:maxTotalAmount/:sortCondition/:sortType',
        views: {
          '': {
            templateUrl: 'views/project/guaranteepro-list.html',
            controller: 'GuaranteeproListCtrl',
            controllerUrl: 'scripts/controller/project/guaranteepro-list-ctrl'
          }
        }
      })
      .state('root.guaranteepro-list-query-no', {
        url: '/guaranteepro-list',
        views: {
          '': {
            templateUrl: 'views/project/guaranteepro-list.html',
            controller: 'GuaranteeproListCtrl',
            controllerUrl: 'scripts/controller/project/guaranteepro-list-ctrl'
          }
        }
      })
      .state('root.investmentplan-list', {
        url: '/investmentplan-list',
        views: {
          '': {
            templateUrl: 'views/project/investmentplan-list.html',
            controller: 'InvestmentplanListCtrl',
            controllerUrl: 'scripts/controller/project/investmentplan-list-ctrl'
          }
        }
      })
      .state('root.activity-details', {
        url: '/activity/:number/:type',
        views: {
          '': {
            templateUrl: 'views/project/activity-details.html',
            controller: 'ActivityDetailsCtrl',
            controllerUrl: 'scripts/controller/project/activity-details-ctrl'
          }
        }
      })
      /*.state('root.activity-tuHao-details', {
        url: '/activity/:activityId/:type',
        views: {
          '': {
            templateUrl: 'views/project/activity-details.html',
            controller: 'ActivityDetailsCtrl',
            controllerUrl: 'scripts/controller/project/activity-details-ctrl'
          }
        }
      })*/
      .state('root.project-details', {
        url: '/project/:number',
        views: {
          '': {
            templateUrl: 'views/project/project-details.html',
            controller: 'ProjectDetailsCtrl',
            controllerUrl: 'scripts/controller/project/project-details-ctrl'
          }
        }
      })

    // 零存宝详情页
    .state('root.current-deposit-details', {
      url: '/current-deposit/:number?tab', // tab表示用户登录前的位置
      views: {
        '': {
          templateUrl: 'views/project/current-deposit-details.html',
          controller: 'InvestmentplanDetailsCtrl',
          controllerUrl: 'scripts/controller/project/investmentplan-details-ctrl'
        }
      }
    })

    // 宏金盈详情页
    .state('root.investmentplan-details', {
      url: '/investmentplan/:number?tab', // tab表示用户登录前的位置
      views: {
        '': {
          templateUrl: 'views/project/investmentplan-details.html',
          controller: 'InvestmentplanDetailsCtrl',
          controllerUrl: 'scripts/controller/project/investmentplan-details-ctrl'
        }
      }
    })

    // 担保公司页面
    .state('root.project-sponsorInstitution', {
      url: '/project-sponsorInstitution/:guaranteeId',
      views: {
        '': {
          templateUrl: 'views/project/project-sponsorInstitution.html',
          controller: 'ProjectSponsorInstitutionCtrl',
          controllerUrl: 'scripts/controller/project/project-sponsorInstitution-ctrl'
        },
        'sponsor': {
          templateUrl: 'views/project/project-sponsor-list.html',
          controller: 'ProjectSponsorInstitutionCtrl',
          controllerUrl: 'scripts/controller/enterprise/guarantee-list-ctrl'
        }
      }
    })

    // 预约流程页
    .state('root.appointment-project', {
        url: '/appointment-project',
        views: {
          '': {
            templateUrl: 'views/project/appointment-project.html',
            controller: 'AppointmentProjectCtrl',
            controllerUrl: 'scripts/controller/project/appointment-project-ctrl'
          }
        }
      })
      /*------------------  safe  ---------------------*/
      .state('root.safe', {
        url: '/safe',
        views: {
          '': {
            templateUrl: 'views/safe.html',
            controller: 'SafeCtrl',
            controllerUrl: 'scripts/controller/project/safe-ctrl'
          }
          /*,
                'sponsor': {
                  templateUrl: 'views/project/project-sponsor-list.html',
                  controller: 'GuaranteeListCtrl',
                  controllerUrl: 'scripts/controller/enterprise/guarantee-list-ctrl'
                }*/
        }
      })
      .state('root.safe-nav', {
        url: '/safe/:anchor',
        views: {
          '': {
            templateUrl: 'views/safe.html',
            controller: 'SafeCtrl',
            controllerUrl: 'scripts/controller/project/safe-ctrl'
          }
          /*,
                'sponsor': {
                  templateUrl: 'views/project/project-sponsor-list.html',
                  controller: 'GuaranteeListCtrl',
                  controllerUrl: 'scripts/controller/enterprise/guarantee-list-ctrl'
                }*/
        }
      })

    /*---------------------------------------------  upload  ---------------------------------------------*/
    // .state('root.upload', {
    //  url: '/upload',
    //  views: {
    //    '': {
    //      templateUrl: 'views/upload/upload.html',
    //      controller: 'UploadCtrl',
    //      controllerUrl: 'scripts/controller/upload/upload-ctrl'
    //    }
    //  }
    // })
    /*---------------------------------------------  order  ---------------------------------------------*/
    // 投资信息确认页面:购物车
    .state('root.invest-verify', {
        url: '/invest-verify/:projectId/:amount',
        views: {
          '': {
            templateUrl: 'views/order/invest-verify.html',
            controller: 'investVerifyCtrl',
            controllerUrl: 'scripts/controller/order/invest-verify-ctrl'
          }
        }
      })
      // 宏包信息确认页面
      .state('root.hongbao-verify', {
        url: '/hongbao-verify/:activityId/:amount',
        views: {
          '': {
            templateUrl: 'views/order/hongbao-verify.html',
            controller: 'hongbaoVerifyCtrl',
            controllerUrl: 'scripts/controller/order/hongbao-verify-ctrl'
          }
        }
      })
      // 宏金盈购物车
      .state('root.invplan-verify', {
        url: '/invplan-verify/:projectId/:amount/:isRepeat',
        views: {
          '': {
            templateUrl: 'views/order/invplan-verify.html',
            controller: 'InvPlanVerifyCtrl',
            controllerUrl: 'scripts/controller/order/invplan-verify-ctrl'
          }
        }
      })
      /*----------------  about-us  --------------------------------*/
      .state('root.about-us', {
        abstract: true,
        views: {
          'about-us-right': {
            templateUrl: 'views/about-us/about-us.html',
            controller: 'AboutUsCtrl',
            controllerUrl: 'scripts/controller/about-us/about-us-ctrl'
          },
          'about-sidebar': {
            templateUrl: 'views/about-us/about-sidebar.html',
            controller: 'AboutUsCtrl',
            controllerUrl: 'scripts/controller/about-us/about-us-ctrl'
          }
        }
      })
      .state('root.about-us.introduction-of-platform', {
        url: '/introduction-of-platform',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/introduction-of-platform.html',
            controller: 'HelpCenterCtrl',
            controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
          }
        }
      })
      .state('root.about-us.company-profile', {
        url: '/company-profile',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/company-profile.html',
            controller: 'HelpCenterCtrl',
            controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
          }
        }
      })
      .state('root.about-us.consultant-team', {
        url: '/consultant-team',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/consultant-team.html',
            controller: 'HelpCenterCtrl',
            controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
          }
        }
      })
      /*------------------  partner  ------------------------*/
      .state('root.partner', {
        abstract: true,
        views: {
          'partner-right': {
            templateUrl: 'views/partner/partner.html',
            controller: 'PartnerCtrl',
            controllerUrl: 'scripts/controller/partner/partner-ctrl'
          },
          'partner-sidebar': {
            templateUrl: 'views/partner/partner-sidebar.html',
            controller: 'PartnerCtrl',
            controllerUrl: 'scripts/controller/partner/partner-ctrl'
          }
        }
      })
      .state('root.partner.partner-platform', {
        url: '/partner-platform',
        views: {
          'partner-right-show': {
            templateUrl: 'views/partner/platform.html'
          }
        }
      })
      // .state('root.partner.company-profile', {
      //   url: '/partner-company-profile',
      //   views: {
      //     'partner-right-show': {
      //       templateUrl: 'views/partner/company-profile.html',
      //       controller: 'HelpCenterCtrl',
      //       controllerUrl: 'scripts/controller/partner/help-center-ctrl'
      //     }
      //   }
      // })
      .state('root.partner.partner-zhongdong', {
        url: '/partner-zhongdong',
        views: {
          'partner-right-show': {
            templateUrl: 'views/partner/zhongdong.html',
          }
        }
      })
      .state('root.partner.partner-jilian', {
        url: '/partner-jilian',
        views: {
          'partner-right-show': {
            templateUrl: 'views/partner/jilian.html',
          }
        }
      })
      .state('root.partner.partner-jibei', {
        url: '/partner-jibei',
        views: {
          'partner-right-show': {
            templateUrl: 'views/partner/jibei.html',
          }
        }
      })
      // yeepay
      .state('root.partner.partner-yeepay', {
        url: '/partner-yeepay',
        views: {
          'partner-right-show': {
            templateUrl: 'views/partner/yeepay.html',
          }
        }
      })
      .state('root.partner.partner-tianchang', {
        url: '/partner-tianchang',
        views: {
          'partner-right-show': {
            templateUrl: 'views/partner/tianchang.html',
          }
        }
      })
      .state('root.partner.partner-hexing', {
        url: '/partner-hexing',
        views: {
          'partner-right-show': {
            templateUrl: 'views/partner/hexing.html',
          }
        }
      })
      /*-------- media-reports  -------------------*/
      .state('root.about-us.media-reports', {
        url: '/media-reports',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/media-reports-list.html',
            controller: 'MediaReportsCtrl',
            controllerUrl: 'scripts/controller/about-us/media-report-ctrl'
          }
        }
      })
      .state('root.about-us.media-reports-detail', {
        url: '/media-reports-detail/:textId',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/media-reports-detail.html',
            controller: 'HongcaiTrendsDetailCtrl',
            controllerUrl: 'scripts/controller/about-us/hongcai-trends-detail-ctrl'
          }
        }
      })
      /*-----------  web-site-notice  ---------------------------*/
      .state('root.about-us.web-site-notice', {
        url: '/web-site-notice',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/web-site-notice-list.html',
            controller: 'WebSiteNoticeCtrl',
            controllerUrl: 'scripts/controller/about-us/web-site-notice-ctrl'
          }
        }
      })
      .state('root.about-us.web-site-notice-detail', {
        url: '/web-site-notice-detail/:textId',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/web-site-notice-detail.html',
            controller: 'HongcaiTrendsDetailCtrl',
            controllerUrl: 'scripts/controller/about-us/hongcai-trends-detail-ctrl'
          }
        }
      })
      /*------------  hongcai-trends  -------------------------*/
      .state('root.about-us.hongcai-trends', {
        url: '/hongcai-trends',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/hongcai-trends-list.html',
            controller: 'HongcaiTrendsCtrl',
            controllerUrl: 'scripts/controller/about-us/hongcai-trends-ctrl'
          }
        }
      })
      .state('root.about-us.hongcai-trends-detail', {
        url: '/hongcai-trends-detail/:textId',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/hongcai-trends-detail.html',
            controller: 'HongcaiTrendsDetailCtrl',
            controllerUrl: 'scripts/controller/about-us/hongcai-trends-detail-ctrl'
          }
        }
      })

    /*-------  get-pwd-back  ----------------------*/
    .state('root.get-pwd-back', {
        url: '/get-pwd-back',
        views: {
          '': {
            templateUrl: 'views/get-pwd-back/get-pwd-back.html',
            controller: 'GetPwdCtrl',
            controllerUrl: 'scripts/controller/get-pwd-back/get-pwd-back-ctrl'
          }
        }
      })
      /*---------  set-new-pwd  --------------------*/
      .state('root.set-new-pwd', {
        url: '/set-new-pwd/:uuid/:etoken',
        views: {
          '': {
            templateUrl: 'views/get-pwd-back/set-new-pwd.html',
            controller: 'SetNewPwdCtrl',
            controllerUrl: 'scripts/controller/get-pwd-back/get-pwd-back-ctrl'
          }
        }
      })
      /*----  agreement --------------------------*/
      .state('root.registration-agreement', {
        url: '/registration-agreement',
        views: {
          '': {
            templateUrl: 'views/agreement/registration-agreement.html'
          }
        }
      })
      .state('root.loan-security-agreement', {
        url: '/loan-security-agreement',
        views: {
          '': {
            templateUrl: 'views/agreement/loan-security-agreement.html'
          }
        }
      })
      .state('root.appointment-project-activityrule', {
        url: '/appointment-project-activityrule',
        views: {
          '': {
            templateUrl: 'views/agreement/appointment-project-activityrule.html'
          }
        }
      })
      /*----------  help-center  -------------------*/
      .state('root.about-us.link-us', {
        url: '/link-us',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/link-us.html',
            controller: 'HelpCenterCtrl',
            controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
          }
        }
      })
      .state('root.help-center', {
        views: {
          'help-center-right': {
            templateUrl: 'views/help-center/help-center.html'
          },
          'help-sidebar': {
            templateUrl: 'views/help-center/help-sidebar.html',
            controller: 'HelpCenterCtrl',
            controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
          }
        }
      })

    /*----------  帮助  -------------------*/
    .state('root.help-center.introduce', {
        url: '/introduce',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/introduce.html',
            controller: 'HelpCenterCtrl',
            controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
          }
        }
      })
      .state('root.help-center.investors', {
        url: '/investors',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/investors.html',
            controller: 'HelpCenterCtrl',
            controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
          }
        }
      })
      .state('root.help-center.account-management', {
        url: '/account-management',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/account-management.html',
            controller: 'HelpCenterCtrl',
            controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
          }
        }
      })
      .state('root.help-center.safety-certification', {
        url: '/safety-certification',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/safety-certification.html',
            controller: 'HelpCenterCtrl',
            controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
          }
        }
      })
      .state('root.help-center.law-and-policy-guarantee', {
        url: '/law-and-policy-guarantee',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/law-and-policy-guarantee.html',
            controller: 'HelpCenterCtrl',
            controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
          }
        }
      })
      .state('root.help-center.other-question', {
        url: '/other-question',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/other-question.html',
            controller: 'HelpCenterCtrl',
            controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
          }
        }
      })
      .state('root.help-center.product', {
        url: '/product',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/product.html',
            controller: 'HelpCenterCtrl',
            controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
          }
        }
      })

    /*--------------- credit assignment  ------------------------*/
    //债权转让列表页 FIX,暂时和列表页公用
    .state('root.credit-list-query', {
        url: '/credit-list/:minTransferAmout/:maxTransferAmount/:minCycle/:maxCycle/:minEarning/:maxEarning/:minTotalAmount/:maxTotalAmount/:sortCondition/:sortType',
        views: {
          '': {
            templateUrl: 'views/project/credit-list.html',
            controller: 'CreditListCtrl',
            controllerUrl: 'scripts/controller/project/credit-list-ctrl'
          }
        }
      })
      .state('root.credit-list-query-no', {
        url: '/credit-list',
        views: {
          '': {
            templateUrl: 'views/project/credit-list.html',
            controller: 'CreditListCtrl',
            controllerUrl: 'scripts/controller/project/credit-list-ctrl'
          }
        }
      })
      //债权转让详情页
      .state('root.credit-details', {
        url: '/credit-details/:assignmentNumber',
        views: {
          '': {
            templateUrl: 'views/project/credit-details.html',
            controller: 'CreditDetailsCtrl',
            controllerUrl: 'scripts/controller/project/credit-details-ctrl'
          }
        }
      })

    // 债权转让下单页(确认页)
    .state('root.credit-verify', {
        url: '/credit-verify/:creditId/:amount',
        views: {
          '': {
            templateUrl: 'views/order/credit-verify.html',
            controller: 'CreditVerifyCtrl',
            controllerUrl: 'scripts/controller/order/credit-verify-ctrl'
          }
        }
      })
      // 债权转让宣传介绍页面
      .state('root.credit-assignment', {
        url: '/credit-assignment',
        views: {
          '': {
            templateUrl: 'views/project/credit-assignment.html',
            controller: 'CreditAssignmentCtrl',
            controllerUrl: 'scripts/controller/project/credit-assignment-ctrl'
          }
        }
      })
      // 成功回调页
      .state('root.credit-success', {
        url: '/credit-success/:etoken',
        views: {
          '': {
            templateUrl: 'views/success.html',
            controller: 'CreditSuccessCtrl',
            controllerUrl: 'scripts/controller/project/credit-success-ctrl'
          }
        }
      })



    /*------------------  app help-center  -----------------------------------------------*/
    .state('app-help-center', {
        abstract: true,
        views: {
          '': {
            templateUrl: 'views/help-center/help-center.html'
          }
        }
      })
      .state('app-help-center.introduce', {
        url: '/introduce-app',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/introduce-app.html'
          }
        }
      })
      .state('app-help-center.investors', {
        url: '/investors-app',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/investors-app.html'
          }
        }
      })
      .state('app-help-center.account-management', {
        url: '/account-management-app',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/account-management-app.html'
          }
        }
      })
      .state('app-help-center.safety-certification', {
        url: '/safety-certification-app',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/safety-certification-app.html'
          }
        }
      })
      .state('app-help-center.law-and-policy-guarantee', {
        url: '/law-and-policy-guarantee-app',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/law-and-policy-guarantee-app.html'
          }
        }
      })
      .state('app-help-center.other-question', {
        url: '/other-question-app',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/other-question-app.html'
          }
        }
      })

    /*--------------------  load page  route  -----------------------------------------*/
    .state('root.load-page', {
        url: '/load-page?from&inviteCode',
        views: {
          '': {
            templateUrl: 'views/load-page.html',
            controller: 'LoadPageCtrl',
            controllerUrl: 'scripts/controller/main/load-page-ctrl'
          }
        }
      })
    /*-------------  邀请活动落地页   ----------------------*/
      .state('root.invite-landing', {
        url: '/invite-landing',
        views: {
          '': {
            templateUrl: 'views/invite-landing.html',
            controller: 'InviteLandingCtrl',
            controllerUrl: 'scripts/controller/activity/invite-landing-ctrl'
          }
        }
      })
    /*-------------  送现金活动落地页   ----------------------*/
    .state('root.send-money', {
      url: '/send-money',
      views: {
        '': {
          templateUrl: 'views/send-money.html',
        }
      }
    })
    /*-------------  体验金项目专享详情页   ----------------------*/
    .state('root.experience-project', {
      url: '/experience-project',
      views: {
        '': {
          templateUrl: 'views/project/experience-project.html',
          controller: 'ExperienceProjectCtrl',
          controllerUrl: 'scripts/controller/project/experience-project-ctrl'
        }
      }
    })
      /*---------------- traffic import route  ----------------------*/
      .state('root.registerMobile-sanGuo', {
        url: '/register-mobile-sanGuo/:from',
        views: {
          '': {
            templateUrl: 'views/register/register-mobile-sanGuo.html',
            controller: 'RegisterMobileSanGuoCtrl',
            controllerUrl: 'scripts/controller/register/register-mobile-ctrl'
          }
        }
      })
      .state('root.project-details-traffic', {
        url: '/project/:projectId/:from',
        views: {
          '': {
            templateUrl: 'views/project/project-details.html',
            controller: 'ProjectDetailsCtrl',
            controllerUrl: 'scripts/controller/project/project-details-ctrl'
          }
        }
      });
    $sceDelegateProvider.resourceUrlWhitelist(['self', 'http://www.hongcai.com/hongcai/api/**']);

    // 导致IE8不兼容的地方。
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    $urlRouterProvider.when('', '/');

    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.get = {};
    }
    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';

    AnalyticsProvider.setAccount('UA-58181412-1');
    AnalyticsProvider.trackPages(true);
    AnalyticsProvider.useDisplayFeatures(true);
    AnalyticsProvider.useAnalytics(true);
    AnalyticsProvider.setPageEvent('$stateChangeSuccess');

  }]);

hongcaiApp.run(function($rootScope, $location, $window, $http, $state, $modal, DEFAULT_DOMAIN, toaster, config, Analytics) {
  Analytics.trackPage('/', '宏财网 hongcai.com - 要理财，上宏财!');
  // Array 在IE8下没有indexOf 方法。
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

  // 需要用户登录才能看到的url
  var routespermission = [
    '/user-center'
  ];

  // 不需要显示footer的path
  var notShowFooterRoute = [
    'login',
    'register',
    'invite-landing',
    'send-money'
  ];

  

  $rootScope.$on('$stateChangeStart', function(event, toState) {
    var title = '网贷平台，投资理财平台，投资理财项目-宏财网';
    if (toState.data && toState.data.title) {
      title = toState.data.title + ' - 要理财，上宏财!';
    }
    $rootScope.pageTitle = title;

    


    $rootScope.showFooter = false;
    if (notShowFooterRoute.indexOf($location.path().split('/')[1]) === -1) {
      $rootScope.showFooter = true;
    }

    var $checkSessionServer = $http.post(DEFAULT_DOMAIN + '/siteUser/checkSession');
    $checkSessionServer
      .error(function(response) {

        window.location.href = config.domain + '/sys-update.html';
        return;
      })
      .success(function(response) {
        
        if (routespermission.indexOf('/' + $location.path().split('/')[1]) !== -1) {
          if (response.data && response.data.name !== '' && response.data.name !== undefined && response.data.name !== null) {
            $rootScope.isLogged = true;
            $rootScope.loginName = response.data.name;
            $rootScope.securityStatus = response.data.securityStatus;
            $rootScope.autoTransfer = response.data.securityStatus.autoTransfer;
            $rootScope.account = response.data.account;
            $rootScope.unreadCount = response.data.unreadCount;
            $rootScope.userType = response.data.userType;
          } else {
            $rootScope.isLogged = false;
            $rootScope.loginName = '';

            // 弹出登录弹层
            $modal({
              scope: $rootScope,
              template: 'views/modal/modal-toLogin.html',
              show: true
            });

          }
        } else {
          if (response.ret !== -1 && response.data && response.data.name !== '' && response.data.name !== undefined && response.data.name !== null) {
            $rootScope.isLogged = true;
            $rootScope.loginName = response.data.name;
            $rootScope.securityStatus = response.data.securityStatus;
            $rootScope.autoTransfer = response.data.securityStatus.autoTransfer;
            $rootScope.account = response.data.account;
            $rootScope.unreadCount = response.data.unreadCount;
            $rootScope.userType = response.data.userType;
          } else {
            $rootScope.isLogged = false;
            $rootScope.loginName = '';
          }
        }
      });




  });



  $rootScope.mobileIOS = ($window.navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false);
  // viewFlAG view层面的显示与否的判断，比如main.html的土豪标图片不显示，在viewFlAG里添加, tuhaoShowFLAG: false (变量注入的是rootScope，FLAG保持全部大写)，然后在main.html做一个ng-show, no-hide的判断即可。
  // ignorePATH route层面的显示与否的判断，比如/lucky-draw抽奖活动咱不对外公布(未上线)，在ignorePATH添加路径/lucky-draw。
  // branch_switch,当该标识关联的功能已开发完成，但并没有对外发布。
  if (config.viewFlAG) {
    angular.forEach(config.viewFlAG, function(value, key) {
      $rootScope[key] = value;
    });
  }
  $rootScope.$on('$stateChangeSuccess', function() {
    // branch_switch， 当该路由关联的功能已开发完成，但并没有对外发布。
    if (config.ignorePATH && config.ignorePATH.indexOf('/' + $location.path().split('/')[1]) !== -1) {
      $location.path('//');
    }
    // 跳转HTTPS的全局配置
    if ($location.protocol() === 'http' && config.jumpHttpsPath && config.jumpHttpsPath.indexOf('/' + $location.path().split('/')[1]) !== -1) {
      $window.location.href = 'https://' + $location.absUrl().split('://')[1];
    }

    $rootScope.selectSide = $location.path().split('/')[2];

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
      'reservation'
    ];
    var showFlag4 = [
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

  });

  $rootScope.reload = function() {
    $state.reload();
  }

  $rootScope.showLoginModal = function(){
    $modal({
      scope: $rootScope,
      template: 'views/modal/modal-toLogin.html',
      show: true
    });
  }

});


hongcaiApp.constant('DEFAULT_DOMAIN', '/hongcai/api/v1');
