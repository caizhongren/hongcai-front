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
 	'angularFileUpload', 
 	'chartjs'
 	]);

 hongcaiApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
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
 				templateUrl: 'views/register/register-mobile.html'
 			}
 		}
 	})
 	.state('root.registerMail', {
 		url: '/register-mail',
 		views: {
 			'': {
 				templateUrl: 'views/register/register-mail.html', 
 				controller: 'RegisterCtrl', 
 				controllerUrl: 'scripts/controller/register/register-ctrl'
 			}
 		}
 	})
 	/*------------------------------------------  user-center  -----------------------------------------------*/
 	
 	.state('root.account-overview', {
 		url: '/account-overview',
 		views: {
 			'user-center-right': {
 				templateUrl: 'views/user-center/account-overview.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			},
 			'sidebar': {
 				templateUrl: 'views/user-center/sidebar.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			}
 		}
 	})
 	.state('root.basic-information', {
 		url: '/basic-information',
 		views: {
 			'user-center-right': {
 				templateUrl: 'views/user-center/basic-information.html',
 				controller: 'BasicInfoCtrl',
 				controllerUrl: 'scripts/controller/user-center/basic-information-ctrl'
 			},
			'sidebar': {
 				templateUrl: 'views/user-center/sidebar.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			}
 		}
 	})
 	.state('root.bankcard-management', {
 		url: '/bankcard-management',
 		views: {
 			'user-center-right': {
 				templateUrl: 'views/user-center/bankcard-management.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			},
			'sidebar': {
 				templateUrl: 'views/user-center/sidebar.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			}
 		}
 	})
 	.state('root.security-settings', {
 		url: '/security-settings',
 		views: {
 			'user-center-right': {
 				templateUrl: 'views/user-center/security-settings.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			},
			'sidebar': {
 				templateUrl: 'views/user-center/sidebar.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			}
 		}
 	})
 	.state('root.assets-overview', {
 		url: '/assets-overview',
 		views: {
 			'user-center-right': {
 				templateUrl: 'views/user-center/assets-overview.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			},
			'sidebar': {
 				templateUrl: 'views/user-center/sidebar.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			}
 		}
 	})
 	.state('root.recharge', {
 		url: '/recharge',
 		views: {
 			'user-center-right': {
 				templateUrl: 'views/user-center/recharge.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			},
			'sidebar': {
 				templateUrl: 'views/user-center/sidebar.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			}
 		}
 	})
 	.state('root.withdraw', {
 		url: '/withdraw',
 		views: {
 			'user-center-right': {
 				templateUrl: 'views/user-center/withdraw.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			},
			'sidebar': {
 				templateUrl: 'views/user-center/sidebar.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			}
 		}
 	})
 	.state('root.record', {
 		url: '/record',
 		views: {
 			'user-center-right': {
 				templateUrl: 'views/user-center/record.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			},
			'sidebar': {
 				templateUrl: 'views/user-center/sidebar.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			}
 		}
 	})
 	.state('root.investment', {
 		url: '/investment',
 		views: {
 			'user-center-right': {
 				templateUrl: 'views/user-center/investment.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			},
			'sidebar': {
 				templateUrl: 'views/user-center/sidebar.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			}
 		}
 	})
 	.state('root.news', {
 		url: '/news',
 		views: {
 			'user-center-right': {
 				templateUrl: 'views/user-center/news.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			},
			'sidebar': {
 				templateUrl: 'views/user-center/sidebar.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			}
 		}
 	})
 	.state('root.realname-authentication', {
 		url: '/realname-authentication',
 		views: {
 			'user-center-right': {
 				templateUrl: 'views/user-center/realname-authentication.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			},
			'sidebar': {
 				templateUrl: 'views/user-center/sidebar.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			}
 		}
 	})
 	/*---------------------------------------------  yeepay-service  ---------------------------------------------*/
 	.state('root.yeepay-callback', {
 		url: '/yeepay-callback/:yeepayService/:yeepayStatus',
 		views: {
 			'': {
 				templateUrl: 'views/user-center/yeepay-callback.html',
 				controller: 'YeepayCtrl',
 				controllerUrl: 'scripts/controller/yeepay/yeepay-ctrl'
 			}
 		}
 	})
 	/*---------------------------------------------  project-list  ---------------------------------------------*/
 	.state('root.project-list', {
 		url: '/project-list',
 		views: {
 			'': {
 				templateUrl: 'views/project-list.html',
 				controller: 'ProjectListCtrl',
 				controllerUrl: 'scripts/controller/project/project-list-ctrl'
 			}
 		}
 	})
 	.state('root.project-list-query', {
 		url: '/project-list/:status/:minCycle/:maxCycle/:minEarning/:maxEarning/:minTotalAmount/:maxTotalAmount/:sortCondition/:sortType',
 		views: {
 			'': {
 				templateUrl: 'views/project-list.html',
 				controller: 'ProjectListCtrl',
 				controllerUrl: 'scripts/controller/project/project-list-ctrl'
 			}
 		}
 	})
 	/*---------------------------------------------  project-details  ---------------------------------------------*/
 	.state('root.project-details', {
 		url: '/project/:projectId',
 		views: {
 			'': {
 				templateUrl: 'views/project-details.html',
 				controller: 'ProjectDetailsCtrl',
 				controllerUrl: 'scripts/controller/project/project-details-ctrl'
 			}
 		}
 	})
 	/*---------------------------------------------  project-sponsorInstitution  ---------------------------------------------*/
 	.state('root.project-sponsorInstitution', {
 		url: '/project-sponsorInstitution',
 		views: {
 			'': {
 				templateUrl: 'views/project-sponsorInstitution.html',
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
 	.state('root.isAvailableInvest', {
 		url: '/isAvailableInvest',
 		views: {
 			'': {
 				templateUrl: 'views/order/shop.html',
 				controller: 'OrderCtrl',
 				controllerUrl: 'scripts/controller/order/order-ctrl'
 			}
 		}
 	})
 	;

 	$urlRouterProvider.otherwise('/');

 }]);

hongcaiApp.run(function($rootScope, $location, $http, DEFAULT_DOMAIN) {
	var routespermission = ['/account-overview', 
							'/assets-overview', 
							'/basic-information', 
							'/realname-authentication'];
	$rootScope.$on('$stateChangeStart', function() {
		if(routespermission.indexOf($location.path()) !== -1) {
			var $checkSessionServer = $http.post(DEFAULT_DOMAIN + '/siteUser/checkSession');
			$checkSessionServer.then(function(response){
				if(response.data.data.name !== '') {
					$rootScope.isLogged = true;
					$rootScope.loginName = sessionStorage.getItem('user');
				} else {
					$location.path('/login');
				}
			});
		}
	});
});

hongcaiApp.constant('DEFAULT_DOMAIN', '/hongcai/api/v1');
