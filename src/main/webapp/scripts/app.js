define(['angularAMD', 'angular-route', 'angular-resource'], function (angularAMD) {
	
    var hongcaiApp = angular.module("hongcaiApp", ['ngRoute', 'ngResource']);
    
    hongcaiApp.config(function ($routeProvider, $locationProvider) {
        $routeProvider
        .when("/project-list", angularAMD.route({templateUrl: 'views/project/project-list.html', controller: 'ProjectListCtrl', controllerUrl: 'scripts/controller/project/project-list-ctrl'
        }))
        .otherwise({redirectTo: '/'});
        
        $locationProvider.hashPrefix('!');
    });
    
    hongcaiApp.filter('startFrom', function() {
        return function(input, start) {
            start = +start;
            return input.slice(start);
        }
    });
    
    return angularAMD.bootstrap(hongcaiApp);
});
