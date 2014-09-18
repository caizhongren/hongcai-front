define([ 'angularAMD', 'angular-route', 'angular-resource' ], function(angularAMD) {

	var hongcaiApp = angular.module("hongcaiApp", ['ngRoute', 'ngResource']);
	
	hongcaiApp.constant('DEFAULT_DOMAIN', "http://127.0.0.1:8080/hongcai/api/v1");

	hongcaiApp.config(function($routeProvider, $locationProvider) {
				$routeProvider
				.when("/project-list", 
						angularAMD.route({
							templateUrl : 'views/project/project-list.html', 
							controller : 'ProjectListCtrl', 
							controllerUrl : 'scripts/controller/project/project-list-ctrl',
							params: {
								status: 'status',
								cycle: 'cycle'
						        }
				}))
				.when("/project-detail/:projectId",
						angularAMD.route({
							templateUrl : 'views/project/project-detail.html',
							controller : 'ProjectDetailCtrl',
							controllerUrl : 'scripts/controller/project/project-detail-ctrl'
				}))
				.otherwise({redirectTo : '/'});

				$locationProvider.hashPrefix('!');
			});

	hongcaiApp.filter('startFrom', function startFrom() {
		return function(input, start) {
			return input.slice(parseInt(start));
		};
	});
	

	return angularAMD.bootstrap(hongcaiApp);
});
