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
  'ngResource',
  'angularMoment',
  'toaster',
  'chartjs',
  'placeholders',
  'angular-loading-bar',
  'bardo.directives',
  'config',
  'sticky',
  'ipCookie',
  'angular-md5',
  'textAngular',
  'angular-google-analytics',
  'bgf.paginateAnything'
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
        url: '/login/:isRedirect',
        views: {
          '': {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            controllerUrl: 'scripts/controller/user-center/login-ctrl'
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
      /*------------------------------------------  banner  -----------------------------------------------*/
      .state('root.banner-fourty', {
        url: '/banner-fourty',
        views: {
          '': {
            templateUrl: 'views/banner-fourty.html'
          }
        }
      })
      .state('root.banner-nine', {
        url: '/banner-nine',
        views: {
          '': {
            templateUrl: 'views/banner-nine.html'
          }
        }
      })
      .state('root.banner-P2B', {
        url: '/banner-P2B',
        views: {
          '': {
            templateUrl: 'views/banner-P2B.html'
          }
        }
      })
      .state('root.banner-partner', {
        url: '/banner-partner',
        views: {
          '': {
            templateUrl: 'views/banner-partner.html'
          }
        }
      })
      .state('root.friends-ship', {
        url: '/friends',
        views: {
          '': {
            templateUrl: 'views/friends-ship.html'
              //templateUrl: 'banner-nine.html'
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
      .state('root.transfer-success', {
        url: '/transfer-success/:status',
        views: {
          '': {
            templateUrl: 'views/success.html',
            controller: 'TransferSuccessCtrl',
            controllerUrl: 'scripts/controller/order/transfer-success-ctrl'
          }
        }
      })
      .state('root.bankcard-success', {
        url: '/bankcard-success/:status',
        views: {
          '': {
            templateUrl: 'views/success.html',
            controller: 'BankcardSuccessCtrl',
            controllerUrl: 'scripts/controller/user-center/bankcard-success-ctrl'
          }
        }
      })
      .state('root.unbind-bankcard-success', {
        url: '/unBindbankcard-success/:status',
        views: {
          '': {
            templateUrl: 'views/success.html',
            controller: 'UnBindBankcardSuccessCtrl',
            controllerUrl: 'scripts/controller/user-center/unbind-bankcard-success-ctrl'
          }
        }
      })
      .state('root.recharge-success', {
        url: '/recharge-success/:status',
        views: {
          '': {
            templateUrl: 'views/success.html',
            controller: 'RechargeSuccessCtrl',
            controllerUrl: 'scripts/controller/user-center/recharge-success-ctrl'
          }
        }
      })
      .state('root.withdraw-success', {
        url: '/withdraw-success/:status',
        views: {
          '': {
            templateUrl: 'views/success.html',
            controller: 'WithdrawSuccessCtrl',
            controllerUrl: 'scripts/controller/user-center/withdraw-success-ctrl'
          }
        }
      })
      /*------------------------------------------  lucky-draw  -----------------------------------------------*/
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

      /*------------------------------------------  user-center  -----------------------------------------------*/
      .state('root.userCenter', {
        views: {
          'user-center': {
            templateUrl: 'views/user-center/user-center.html',
            // controller: 'UserCenterCtrl',
            controllerUrl: 'scripts/controller/user-center-ctrl'
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
        }
      })
      .state('root.userCenter.record', {
        url: '/record',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/record.html',
            controller: 'UserDealCtrl',
            controllerUrl: 'scripts/controller/user-center/user-deal-ctrl'
          }
        }
      })
      .state('root.userCenter.record-query', {
        url: '/record/:dateInterval/:type',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/record.html',
            controller: 'UserDealCtrl',
            controllerUrl: 'scripts/controller/user-center/user-deal-ctrl'
          }
        }
      })
      .state('root.userCenter.investment', {
        url: '/userCenter-investment',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/investment.html',
            controller: 'UserOrderCtrl',
            controllerUrl: 'scripts/controller/user-center/user-order-ctrl'
          }
        }
      })
      .state('root.userCenter.investment-query', {
        url: '/userCenter-investment/:dateInterval/:status',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/investment.html',
            controller: 'UserOrderCtrl',
            controllerUrl: 'scripts/controller/user-center/user-order-ctrl'
          }
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
      .state('root.userCenter.reservation', {
        url: '/reservation/:status',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/reservation.html',
            controller: 'ReservationCtrl',
            controllerUrl: 'scripts/controller/user-center/reservation-ctrl'
          }
        }
      })
      .state('root.userCenter.reservation-query', {
        url: '/reservation/:dateInterval/:type',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/reservation.html',
            controller: 'ReservationCtrl',
            controllerUrl: 'scripts/controller/user-center/reservation-ctrl'
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
      /*---------------------------------------------  yeepay  ---------------------------------------------*/
      .state('root.open-yeepay-account-success', {
        url: '/yeepay-success/:status',
        views: {
          '': {
            templateUrl: 'views/success.html',
            controller: 'YeepaySuccessCtrl',
            controllerUrl: 'scripts/controller/user-center/yeepay-success-ctrl'
          }
        }
      })
      .state('app-yeepay-callback', {
        url: '/app-yeepay-register-callback',
        views: {
          '': {
            templateUrl: 'views/wireless/register_ok_callback.html'
          }
        }
      })

    /*---------------------------------------------  project  ---------------------------------------------*/
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
      .state('root.project-list-query', {
        url: '/project-list/:status/:minCycle/:maxCycle/:minEarning/:maxEarning/:minTotalAmount/:maxTotalAmount/:sortCondition/:sortType',
        views: {
          '': {
            templateUrl: 'views/project/project-list.html',
            controller: 'ProjectListCtrl',
            controllerUrl: 'scripts/controller/project/project-list-ctrl'
          }
        }
      })
      .state('root.activity-details', {
        url: '/activity/:activityId/:type',
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
      /*---------------------------------------------  safe  ---------------------------------------------*/
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
      /*------------------------------------------  about-us  -----------------------------------------------*/
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
            templateUrl: 'views/about-us/introduction-of-platform.html'
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
      /*------------------------------------------  partner  -----------------------------------------------*/
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
      /*------------------------------------------  media-reports  -----------------------------------------------*/
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
      /*------------------------------------------  web-site-notice  -----------------------------------------------*/
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
      /*------------------------------------------  hongcai-trends  -----------------------------------------------*/
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
      .state('root.about-us.link-us', {
        url: '/link-us',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/link-us.html'
          }
        }
      })
      /*------------------------------------------  get-pwd-back  -----------------------------------------------*/
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
      /*------------------------------------------  set-new-pwd  -----------------------------------------------*/
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
      /*------------------------------------------  agreement -----------------------------------------------*/
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
      /*------------------------------------------  help-center  -----------------------------------------------*/
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
      .state('root.help-center.introduce', {
        url: '/introduce',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/introduce.html'
          }
        }
      })
      .state('root.help-center.investors', {
        url: '/investors',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/investors.html'
          }
        }
      })
      .state('root.help-center.account-management', {
        url: '/account-management',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/account-management.html'
          }
        }
      })
      .state('root.help-center.safety-certification', {
        url: '/safety-certification',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/safety-certification.html'
          }
        }
      })
      .state('root.help-center.law-and-policy-guarantee', {
        url: '/law-and-policy-guarantee',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/law-and-policy-guarantee.html'
          }
        }
      })
      .state('root.help-center.other-question', {
        url: '/other-question',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/other-question.html'
          }
        }
      })
      /*------------------------------------------  app help-center  -----------------------------------------------*/
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
      /*------------------------------------------  app callback view  -----------------------------------------------*/
      .state('app-callback', {
        abstract: true,
        views: {
          '': {
            templateUrl: 'views/appview/main.html'
          }
        }
      })
      .state('app-callback.apprechrage-success', {
        url: '/apprecharge-success',
        views: {
          'app-callback-view': {
            templateUrl: 'views/appview/apprecharge-success.html'
          }
        }
      })
      .state('app-callback.appinvestment-success', {
        url: '/appinvestment-success',
        views: {
          'app-callback-view': {
            templateUrl: 'views/appview/appinvestment-success.html'
          }
        }
      })
      .state('app-callback.appregistration-success', {
        url: '/appregistration-success',
        views: {
          'app-callback-view': {
            templateUrl: 'views/appview/appregistration-yeepay.html'
          }
        }
      })
      .state('app-callback.canceltie-card', {
        url: '/canceltie-card',
        views: {
          'app-callback-view': {
            templateUrl: 'views/appview/canceltie-card.html'
          }
        }
      })
      .state('app-callback.apptie-card', {
        url: '/apptie-card',
        views: {
          'app-callback-view': {
            templateUrl: 'views/appview/apptie-card.html'
          }
        }
      })
    /*-------------------------------------------  load page  route  -----------------------------------------*/
          .state('root.load-page', {
        url: '/load-page',
        views: {
          '': {
            templateUrl: 'views/load-page.html',
            controller: 'LoadPageCtrl',
            controllerUrl: 'scripts/controller/main/load-page-ctrl'
          }
        }
      })
    /*-------------------------------------------  traffic import route  -----------------------------------------*/
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

hongcaiApp.run(function($rootScope, $location, $window, $http, $state, DEFAULT_DOMAIN, toaster, config, Analytics) {
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

  var routespermission = ['/account-overview',
    '/assets-overview',
    '/realname-authentication',
    '/security-settings',
    '/withdraw',
    '/recharge',
    '/invest-verify',
    '/bankcard-management',
    '/userCenter-investment',
    '/record',
    '/gift-overview',
    '/invite-rebate',
    '/userCenter-investment',
    '/gift-rebate',
    '/invite-rebate',
    '/gift-overview',
    '/reservation'
  ];
  $rootScope.$on('$stateChangeStart', function() {
    var $checkSessionServer = $http.post(DEFAULT_DOMAIN + '/siteUser/checkSession');
    if (routespermission.indexOf('/' + $location.path().split('/')[1]) !== -1) {
      $checkSessionServer.then(function(response) {
        if (response.data.data && response.data.data.name !== '' && response.data.data.name !== undefined && response.data.data.name !== null) {
          $rootScope.isLogged = true;
          $rootScope.loginName = response.data.data.name;
          $rootScope.securityStatus = response.data.data.securityStatus;
          $rootScope.userCapital = response.data.data.userCapital;
          $rootScope.unreadCount = response.data.data.unreadCount;
        } else {
          $rootScope.isLogged = false;
          $rootScope.loginName = '';
          $location.path('/login/');
        }
      });
    } else {
      $checkSessionServer.then(function(response) {
        if (response.data.data && response.data.data.name !== '' && response.data.data.name !== undefined && response.data.data.name !== null) {
          $rootScope.isLogged = true;
          $rootScope.loginName = response.data.data.name;
          $rootScope.securityStatus = response.data.data.securityStatus;
          $rootScope.userCapital = response.data.data.userCapital;
          $rootScope.unreadCount = response.data.data.unreadCount;
        } else {
          $rootScope.isLogged = false;
          $rootScope.loginName = '';
        }
      });
    }
  });
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
      // toaster.pop('error', '别闹，这个功能还没开放那');
      $location.path('//');
    }
    // 跳转HTTPS的全局配置
    if ($location.protocol() === 'http' && config.jumpHttpsPath && config.jumpHttpsPath.indexOf('/' + $location.path().split('/')[1]) !== -1) {
      $window.location.href = 'https://' + $location.absUrl().split('://')[1];
    }
  });
});


hongcaiApp.constant('DEFAULT_DOMAIN', '/hongcai/api/v1');
