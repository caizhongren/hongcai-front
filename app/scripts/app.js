'use strict';
/**
 * @ngdoc overview
 * @name hongcaiApp
 * @description
 * #
 * 宏财JS库依赖以及程序路由主配置文件
 */
define([ 'angularAMD', 
         'angular-ui-router', 
         'angular-resource', 
         'angular-animate', 
         'angular-sanitize', 
         'jquery', 
         'bootstrap', 
         'angular-strap', 
         'angular-strap-tpl'], function(angularAMD) {

    var hongcaiApp = angular.module('hongcaiApp', [
        'ngAnimate', 
        'ngSanitize', 
        'mgcrea.ngStrap', 
        'ui.router',
        'ngResource' 
      ]);

    hongcaiApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('root', {
              abstract: true,
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/root.html'
                }),
                'header': angularAMD.route({
                  templateUrl: 'views/header.html'
                }),
                'footer': angularAMD.route({
                  templateUrl: 'views/footer.html'
                })
              }
            })
          .state('root.main', {
              url: '/',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/main.html', 
                  controller: 'MainCtrl', 
                  controllerUrl: 'ngload!scripts/controller/main/main-ctrl'
                }), 
                'slider': angularAMD.route({
                  templateUrl: 'views/slider.html'
                })
              }
            })
          .state('root.login', {
              url: '/login',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/login.html'//, 
                  /*controller: 'LoginCtrl', 
                  controllerUrl: 'ngload!scripts/controller/login-ctrl'*/
                })
              }
            })
          .state('root.phoneRegiste', {
              url: '/registe',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/phone_registe.html'//, 
                  /*controller: 'LoginCtrl', 
                  controllerUrl: 'ngload!scripts/controller/login-ctrl'*/
                })
              }
            })
          .state('root.mailRegiste', {
              url: '/registe',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/mail_registe.html'//, 
                  /*controller: 'LoginCtrl', 
                  controllerUrl: 'ngload!scripts/controller/login-ctrl'*/
                })
              }
            })
          ;

          $urlRouterProvider.otherwise('/');

      }]);

    hongcaiApp.constant('DEFAULT_DOMAIN', "/admin/api/v1");

    angularAMD.bootstrap(hongcaiApp);
  
    return hongcaiApp;

});
