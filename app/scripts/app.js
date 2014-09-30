'use strict';

/**
 * @ngdoc overview
 * @name p2pSiteWebApp
 * @description
 * # p2pSiteWebApp
 *
 * Main module of the application.
 */
angular
  .module('p2pSiteWebApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
  .config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('root', {
        abstract: true,
        views: {
          '': {
            templateUrl: 'views/root.html'
            // controller: 'DefaultCtrl'
          },
          'header': {
            templateUrl: 'views/header.html'
          },
          'slider': {
            templateUrl: 'views/slider.html'
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
            templateUrl: 'views/main.html'
          }
        }
      })
      ;

      $urlRouterProvider.otherwise('/');
  }])
  ;
