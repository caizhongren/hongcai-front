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
 	'angularFileUpload'
 	]);

 hongcaiApp.config(['$stateProvider', '$urlRouterProvider' ,'$locationProvider' , function($stateProvider, $urlRouterProvider, $locationProvider) {
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
 				templateUrl: 'views/slider.html'
 			},
 			'sponsor': {
 				templateUrl: 'views/project/project-sponsor-list.html'
 			}
 		}
 	})
 	.state('root.login', {
 		url: '/login',
 		views: {
 			'': {
 				templateUrl: 'views/login.html',
 				controller: 'LoginCtrl',
 				controllerUrl: 'scripts/controller/user-center/login-ctrl'
 			}
 		}
 	})
 	.state('root.registerMobile', {
 		url: '/register-mobile',
 		views: {
 			'': {
 				templateUrl: 'views/register/register-mobile.html', 
 				controller: 'RegisterMobileCtrl', 
 				controllerUrl: 'scripts/controller/register/register-mobile-ctrl'
 			}
 		}
 	})
 	.state('root.registerMail', {
 		url: '/register-mail',
 		views: {
 			'': {
 				templateUrl: 'views/register/register-mail.html', 
 				controller: 'RegisterMailCtrl', 
 				controllerUrl: 'scripts/controller/register/register-mail-ctrl'
 			}
 		}
 	})
 	/*------------------------------------------  user-center  -----------------------------------------------*/
 	.state('root.userCenter', {
 		views: {
 			'user-center': {
 				templateUrl: 'views/user-center/user-center.html',
 				controller: 'UserCenterCtrl',
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
 			'user-center': {
 				templateUrl: 'views/user-center/account-overview.html',
 				controller: 'AccountOverviewCtrl',
 				controllerUrl: 'scripts/controller/user-center/account-overview-ctrl'
 			}
 		}
 	})
 	.state('root.userCenter.assets-overview', {
 		url: '/assets-overview',
 		views: {
 			'user-center': {
 				templateUrl: 'views/user-center/assets-overview.html',
 				controller: 'AssetsOverviewCtrl',
 				controllerUrl: 'scripts/controller/user-center/assets-overview-ctrl'
 			}
 		}
 	})
 	.state('root.userCenter.bankcard-management', {
 		url: '/bankcard-management',
 		views: {
 			'user-center': {
 				templateUrl: 'views/user-center/bankcard-management.html',
 				controller: 'BankCardManagementCtrl',
 				controllerUrl: 'scripts/controller/user-center/bankcard-management-ctrl'
 			}
 		}
 	})
 	.state('root.userCenter.security-settings', {
 		url: '/security-settings',
 		views: {
 			'user-center': {
 				templateUrl: 'views/user-center/security-settings.html',
 				controller: 'SecuritySettingsCtrl',
 				controllerUrl: 'scripts/controller/user-center/security-settings-ctrl'
 			}
 		}
 	})
 	.state('root.userCenter.recharge', {
 		url: '/recharge',
 		views: {
 			'user-center': {
 				templateUrl: 'views/user-center/recharge.html',
 				controller: 'RechargeCtrl',
 				controllerUrl: 'scripts/controller/user-center/recharge-ctrl'
 			}
 		}
 	})
 	.state('root.userCenter.withdraw', {
 		url: '/withdraw',
 		views: {
 			'user-center': {
 				templateUrl: 'views/user-center/withdraw.html',
 				controller: 'WithdrawCtrl',
 				controllerUrl: 'scripts/controller/user-center/withdraw-ctrl'
 			}
 		}
 	})
 	.state('root.userCenter.record', {
 		url: '/record',
 		views: {
 			'user-center': {
 				templateUrl: 'views/user-center/record.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			}
 		}
 	})
 	.state('root.userCenter.investment', {
 		url: '/userCenter-investment',
 		views: {
 			'user-center': {
 				templateUrl: 'views/user-center/investment.html',
 				controller: 'UserOrderCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-order-ctrl'
 			}
 		}
 	})
 	.state('root.userCenter.investment-query', {
 		url: '/userCenter-investment/:dateInterval',
 		views: {
 			'user-center': {
 				templateUrl: 'views/user-center/investment.html',
 				controller: 'UserOrderCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-order-ctrl'
 			}
 		}
 	})
 	.state('root.userCenter.news', {
 		url: '/news',
 		views: {
 			'user-center': {
 				templateUrl: 'views/user-center/news.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			}
 		}
 	})
 	.state('root.userCenter.realname-authentication', {
 		url: '/realname-authentication',
 		views: {
 			'user-center': {
 				templateUrl: 'views/user-center/realname-authentication.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			}
 		}
 	})
 	/*---------------------------------------------  yeepay  ---------------------------------------------*/
 	.state('root.userCenter.yeepay-callback', {
 		url: '/yeepay-callback/:yeepayService/:yeepayStatus',
 		views: {
 			'': {
 				templateUrl: 'views/user-center/yeepay-callback.html',
 				controller: 'YeepayCtrl',
 				controllerUrl: 'scripts/controller/yeepay/yeepay-ctrl'
 			}
 		}
 	})
 	/*---------------------------------------------  project  ---------------------------------------------*/
 	.state('root.project-list', {
 		url: '/project-list',
 		views: {
 			'': {
 				templateUrl: 'views/project/project-list.html',
 				controller: 'ProjectListCtrl',
 				controllerUrl: 'scripts/controller/project/project-list-ctrl'
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
 		url: '/project-sponsorInstitution',
 		views: {
 			'': {
 				templateUrl: 'views/project/project-sponsorInstitution.html',
 				controller: 'ProjectSponsorInstitutionCtrl',
 				controllerUrl: 'scripts/controller/project/project-sponsorInstitution-ctrl'
 			},
 			'sponsor': {
 				templateUrl: 'views/project/project-sponsor-list.html',
 				controller: 'ProjectSponsorInstitutionCtrl',
 				controllerUrl: 'scripts/controller/project/project-sponsorInstitution-ctrl'
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
 			},
 			'sponsor': {
 				templateUrl: 'views/project/project-sponsor-list.html',
 				controller: 'ProjectSponsorInstitutionCtrl',
 				controllerUrl: 'scripts/controller/project/project-sponsorInstitution-ctrl'
 			}
 		}
 	})
 	.state('root.safe-nav', {
 		url: '/safe/:anchor',
 		views: {
 			'': {
 				templateUrl: 'views/safe.html',
 				controller: 'SafeCtrl',
 				controllerUrl: 'scripts/controller/project/safe-ctrl'
 			},
 			'sponsor': {
 				templateUrl: 'views/project/project-sponsor-list.html',
 				controller: 'ProjectSponsorInstitutionCtrl',
 				controllerUrl: 'scripts/controller/project/project-sponsorInstitution-ctrl'
 			}
 		}
 	})

 	/*---------------------------------------------  upload  ---------------------------------------------*/
 	.state('root.upload', {
 		url: '/upload',
 		views: {
 			'': {
 				templateUrl: 'views/upload/upload.html',
 				controller: 'UploadCtrl',
 				controllerUrl: 'scripts/controller/upload/upload-ctrl'
 			}
 		}
 	})
 	/*---------------------------------------------  order  ---------------------------------------------*/
 	.state('root.invest-verify', {//投资信息确认页面:购物车
 		url: '/invest-verify/:projectId/:amount',
 		views: {
 			'': {
 				templateUrl: 'views/order/invest-verify.html',
 				controller: 'investVerifyCtrl',
 				controllerUrl: 'scripts/controller/order/invest-verify-ctrl'
 			}
 		}
 	})
 	/*------------------------------------------  about-us  -----------------------------------------------*/
 	.state('root.about-us', {
 		views: {
 			'about-us': {
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
 			'about-us-right': {
 				templateUrl: 'views/about-us/introduction-of-platform.html',
 				controller: 'IntroductionCtrl',
 				controllerUrl: 'scripts/controller/about-us/about-us-ctrl'
 			}
 		}
 	})
 	.state('root.about-us.business-model', {
 		url: '/business-model',
 		views: {
 			'about-us-right': {
 				templateUrl: 'views/about-us/business-model.html',
 				controller: 'BusinessModelCtrl',
 				controllerUrl: 'scripts/controller/about-us/about-us-ctrl'
 			}
 		}
 	})
 	.state('root.about-us.company-profile', {
 		url: '/company-profile',
 		views: {
 			'about-us-right': {
 				templateUrl: 'views/about-us/company-profile.html',
 				controller: 'CompanyProfileCtrl',
 				controllerUrl: 'scripts/controller/about-us/about-us-ctrl'
 			}
 		}
 	})
 	.state('root.about-us.web-site-announcement', {
 		url: '/web-site-announcement',
 		views: {
 			'about-us-right': {
 				templateUrl: 'views/about-us/web-site-announcement.html',
 				controller: 'WebSiteCtrl',
 				controllerUrl: 'scripts/controller/about-us/about-us-ctrl'
 			}
 		}
 	})
 	.state('root.about-us.hongcaidynamic', {
 		url: '/hongcaidynamic',
 		views: {
 			'about-us-right': {
 				templateUrl: 'views/about-us/hongcaidynamic.html',
 				controller: 'HongcaiDynamicCtrl',
 				controllerUrl: 'scripts/controller/about-us/about-us-ctrl'
 			}
 		}
 	})
 	.state('root.about-us.media-reports', {
 		url: '/media-reports',
 		views: {
 			'about-us-right': {
 				templateUrl: 'views/about-us/media-reports.html',
 				controller: 'MediaReportsCtrl',
 				controllerUrl: 'scripts/controller/about-us/about-us-ctrl'
 			}
 		}
 	})
 	.state('root.about-us.link-us', {
 		url: '/link-us',
 		views: {
 			'about-us-right': {
 				templateUrl: 'views/about-us/link-us.html',
 				controller: 'LinkUsCtrl',
 				controllerUrl: 'scripts/controller/about-us/about-us-ctrl'
 			}
 		}
 	})
 	.state('root.about-us.news-details', {
 		url: '/news-details',
 		views: {
 			'about-us-right': {
 				templateUrl: 'views/about-us/news-details.html',
 				controller: 'NewsCtrl',
 				controllerUrl: 'scripts/controller/about-us/about-us-ctrl'
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
 	;

 	$urlRouterProvider.otherwise('/');
 	$locationProvider.html5Mode(true);
 	$locationProvider.hashPrefix('!');

 }]);

hongcaiApp.run(function($rootScope, $location, $http, DEFAULT_DOMAIN) {
	var routespermission = ['/account-overview', 
							'/assets-overview',  
							'/realname-authentication',
							'/security-settings',
							'/withdraw',
							'/recharge'];
	$rootScope.$on('$stateChangeStart', function() {
		var $checkSessionServer = $http.post(DEFAULT_DOMAIN + '/siteUser/checkSession');
		if(routespermission.indexOf($location.path()) !== -1) {
			$checkSessionServer.then(function(response){
				if(response.data.data.name !== '') {
					$rootScope.isLogged = true;
					$rootScope.loginName = response.data.data.name;
				} else {
					$location.path('/login');
				}
			});
		} else {
			$checkSessionServer.then(function(response){
				if(response.data.data.name !== '') {
					$rootScope.isLogged = true;
					$rootScope.loginName = response.data.data.name;
				}
			});
		}
	});
});

hongcaiApp.constant('DEFAULT_DOMAIN', '/hongcai/api/v1');
