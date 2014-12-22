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
  'angular-md5'
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
 .config(['$stateProvider', '$urlRouterProvider' ,'$locationProvider', '$uiViewScrollProvider', '$httpProvider' , function($stateProvider, $urlRouterProvider, $locationProvider, $uiViewScrollProvider, $httpProvider) {
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
 				controllerUrl: 'scripts/controller/main/main-ctrl'
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
        controllerUrl: 'scripts/controller/main/main-ctrl'
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
  //土豪活动，暂时不上线。
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
 		url: '/record/:dateInterval/:type/:dateStart/:dateEnd',
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
 		url: '/userCenter-investment/:dateInterval/:status/:dateStart/:dateEnd',
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
 		url: '/gift-rebate/:type/:dateInterval/:status/:dateStart/:dateEnd',
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
 		url: '/project/:projectId',
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
 				controllerUrl: 'scripts/controller/project/guarantee-sponsorInstitution-ctrl'
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
 			}/*,
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
 			}/*,
 			'sponsor': {
 				templateUrl: 'views/project/project-sponsor-list.html',
 				controller: 'GuaranteeListCtrl',
 				controllerUrl: 'scripts/controller/enterprise/guarantee-list-ctrl'
 			}*/
 		}
 	})

 	/*---------------------------------------------  upload  ---------------------------------------------*/
 	// .state('root.upload', {
 	// 	url: '/upload',
 	// 	views: {
 	// 		'': {
 	// 			templateUrl: 'views/upload/upload.html',
 	// 			controller: 'UploadCtrl',
 	// 			controllerUrl: 'scripts/controller/upload/upload-ctrl'
 	// 		}
 	// 	}
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
 	;
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

 }]);

hongcaiApp.run(function($rootScope, $location, $window, $http, $state, DEFAULT_DOMAIN) {
  // Array 在IE8下没有indexOf 方法。
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(obj, start) {
     for (var i = (start || 0), j = this.length; i < j; i++) {
        if (this[i] === obj) { return i; }
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
              '/gift-overview'];
  $rootScope.$on('$stateChangeStart', function() {
    var $checkSessionServer = $http.post(DEFAULT_DOMAIN + '/siteUser/checkSession');
    if(routespermission.indexOf('/'  + $location.path().split('/')[1]) !== -1) {
      $checkSessionServer.then(function(response){
        if(response.data.data && response.data.data.name !== '' && response.data.data.name !== undefined && response.data.data.name !== null) {
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
        if(response.data.data && response.data.data.name !== '' && response.data.data.name !== undefined && response.data.data.name !== null) {
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
});


hongcaiApp.constant('DEFAULT_DOMAIN', '/hongcai/api/v1');
