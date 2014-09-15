'use strict';

/**
 * @name HONGCAI WEB
 * @description
 * Main module of the application.
 */
var hongcaiApp = angular.module('hongcaiApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMd5',
    'hongcaiResources'
  ]);

hongcaiApp.constant('accountname', 'this is constanttest');

hongcaiApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {templateUrl: 'views/main.html', controller: 'MainCtrl'})
      .when('/about', {templateUrl: 'views/about.html', controller: 'AboutCtrl'})
      .when('/project-list', {templateUrl: 'views/project-list.html', controller: 'ProjectListCtrl'})
      .when('/project-detail/:id', {templateUrl: 'views/project-detail.html', controller: 'ProjectDetailCtrl'})
      .otherwise({redirectTo: '/'});
    
    $locationProvider.hashPrefix('!');
  });

hongcaiApp.filter('startFrom', function() {
    return function(input, start) {
        start = +start;
        return input.slice(start);
    }
});
