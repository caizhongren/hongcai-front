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
                  templateUrl: 'views/header.html',
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
                  templateUrl: 'views/login.html', 
                  controller: 'loginCtrl', 
                  controllerUrl: 'ngload!scripts/controller/main/login-ctrl'
                })
              }
            })
          .state('root.phoneRegist', {
              url: '/registe',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/phone_regist.html'//, 
                  /*controller: 'LoginCtrl', 
                  controllerUrl: 'ngload!scripts/controller/login-ctrl'*/
                })
              }
            })
          .state('root.mailRegist', {
              url: '/registe',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/mail_regist.html'//, 
                  /*controller: 'LoginCtrl', 
                  controllerUrl: 'ngload!scripts/controller/login-ctrl'*/
                })
              }
            })
          .state('root.account-overview', {
              url: '/account-overview',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/user-center/account-overview.html', 
                  controller: 'userCenterCtrl', 
                  controllerUrl: 'ngload!scripts/controller/main/user-center-ctrl'
                })
              }
            })
          .state('root.basic-information', {
              url: '/basic-information',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/user-center/basic-information.html', 
                  controller: 'userCenterCtrl', 
                  controllerUrl: 'ngload!scripts/controller/main/user-center-ctrl'
                })
              }
            })
          .state('root.bankcard-management', {
              url: '/bankcard-management',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/user-center/bankcard-management.html', 
                 controller: 'userCenterCtrl', 
                  controllerUrl: 'ngload!scripts/controller/main/user-center-ctrl'
                })
              }
            })
          .state('root.security-settings', {
              url: '/security-settings',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/user-center/security-settings.html', 
                  controller: 'userCenterCtrl', 
                  controllerUrl: 'ngload!scripts/controller/main/user-center-ctrl'
                })
              }
            })
          .state('root.assets-overview', {
              url: '/assets-overview',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/user-center/assets-overview.html', 
                  controller: 'userCenterCtrl', 
                  controllerUrl: 'ngload!scripts/controller/main/user-center-ctrl'
                })
              }
            })
          .state('root.recharge', {
              url: '/recharge',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/user-center/recharge.html', 
                  controller: 'userCenterCtrl', 
                  controllerUrl: 'ngload!scripts/controller/main/user-center-ctrl'
                })
              }
            })
          .state('root.withdraw', {
              url: '/withdraw',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/user-center/withdraw.html', 
                  controller: 'userCenterCtrl', 
                  controllerUrl: 'ngload!scripts/controller/main/user-center-ctrl'
                })
              }
            })
          .state('root.record', {
              url: '/record',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/user-center/record.html', 
                  controller: 'userCenterCtrl', 
                  controllerUrl: 'ngload!scripts/controller/main/user-center-ctrl'
                })
              }
            })
          .state('root.investment', {
              url: '/investment',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/user-center/investment.html', 
                  controller: 'userCenterCtrl', 
                  controllerUrl: 'ngload!scripts/controller/main/user-center-ctrl'
                })
              }
            })
          .state('root.news', {
              url: '/news',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/user-center/news.html', 
                  controller: 'userCenterCtrl', 
                  controllerUrl: 'ngload!scripts/controller/main/user-center-ctrl'
                })
              }
            })
          .state('root.realname-authentication', {
              url: '/realname-authentication',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/user-center/realname-authentication.html', 
                  controller: 'userCenterCtrl', 
                  controllerUrl: 'ngload!scripts/controller/main/user-center-ctrl'
                })
              }
            })
          ;

          $urlRouterProvider.otherwise('/');

      }]);

    hongcaiApp.constant('DEFAULT_DOMAIN', "/hongcai/api/v1");

    angularAMD.bootstrap(hongcaiApp);
  
    return hongcaiApp;

});
