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
 	'toaster'
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
 				templateUrl: 'views/register-mobile.html'
 			}
 		}
 	})
 	.state('root.registerMail', {
 		url: '/register-mail',
 		views: {
 			'': {
 				templateUrl: 'views/register-mail.html', 
 				controller: 'RegisterCtrl', 
 				controllerUrl: 'scripts/controller/register/register-ctrl'
 			}
 		}
 	})
 	/*------------------------------------------  user-center  -----------------------------------------------*/
 	.state('root.account-overview', {
 		url: '/account-overview',
 		views: {
 			'': {
 				templateUrl: 'views/user-center/account-overview.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			}
 		}
 	})
 	.state('root.basic-information', {
 		url: '/basic-information',
 		views: {
 			'': {
 				templateUrl: 'views/user-center/basic-information.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			}
 		}
 	})
 	.state('root.bankcard-management', {
 		url: '/bankcard-management',
 		views: {
 			'': {
 				templateUrl: 'views/user-center/bankcard-management.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			}
 		}
 	})
 	.state('root.security-settings', {
 		url: '/security-settings',
 		views: {
 			'': {
 				templateUrl: 'views/user-center/security-settings.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			}
 		}
 	})
 	.state('root.assets-overview', {
 		url: '/assets-overview',
 		views: {
 			'': {
 				templateUrl: 'views/user-center/assets-overview.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			}
 		}
 	})
 	.state('root.recharge', {
 		url: '/recharge',
 		views: {
 			'': {
 				templateUrl: 'views/user-center/recharge.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			}
 		}
 	})
 	.state('root.withdraw', {
 		url: '/withdraw',
 		views: {
 			'': {
 				templateUrl: 'views/user-center/withdraw.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			}
 		}
 	})
 	.state('root.record', {
 		url: '/record',
 		views: {
 			'': {
 				templateUrl: 'views/user-center/record.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			}
 		}
 	})
 	.state('root.investment', {
 		url: '/investment',
 		views: {
 			'': {
 				templateUrl: 'views/user-center/investment.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			}
 		}
 	})
 	.state('root.news', {
 		url: '/news',
 		views: {
 			'': {
 				templateUrl: 'views/user-center/news.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
 			}
 		}
 	})
 	.state('root.realname-authentication', {
 		url: '/realname-authentication',
 		views: {
 			'': {
 				templateUrl: 'views/user-center/realname-authentication.html',
 				controller: 'UserCenterCtrl',
 				controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
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
 	;

 	$urlRouterProvider.otherwise('/');

 }]);

hongcaiApp.run(function($rootScope, $location, $http, DEFAULT_DOMAIN) {
	var routespermission = ['/account-overview'];
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
