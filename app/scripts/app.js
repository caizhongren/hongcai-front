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
    'ui.router',
    'restangular'
  ])
  // .config(['RestangularProvider',function(RestangularProvider) {
  //   var baseUrl = '/hongcai/api/v1';
  //   RestangularProvider.setBaseUrl(baseUrl);
  //   RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
  //     var extractedData;
  //     // .. to look for getList operations
  //     if (operation === 'getList') {
  //       // .. and handle the data and meta data
  //       // extractedData = data.data.data;
  //       // extractedData.meta = data.data.meta;
  //       console.log(data);
  //       // extractedData = data.data;
  //     } else {
  //       // extractedData = data.data;
  //       console.log(data);
  //     }
  //     return extractedData;
  //   });
  // }])
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
            controller: 'MainCtrl'
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
            templateUrl: 'views/login.html'
          }
        }
      })
      .state('root.registe', {
        url: '/phone_registe',
        views: {
          '': {
            templateUrl: 'views/phone_registe.html'
          }
        }
      })
      ;

      $urlRouterProvider.otherwise('/');
  }])
  ;
