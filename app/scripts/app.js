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
                  controller: 'LoginCtrl',
                  controllerUrl: 'ngload!scripts/controller/user-center/login-ctrl'
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
          /*--------------------------------------------- user center  ---------------------------------------------*/
          .state('root.login', {
              url: '/login',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/login.html',
                  controller: 'LoginCtrl',
                  controllerUrl: 'ngload!scripts/controller/user-center/login-ctrl'
                })
              }
            })
          .state('root.phoneRegist', {
              url: '/registe',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/phone_regist.html'
                })
              }
            })
          .state('root.mailRegist', {
              url: '/registe',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/mail_regist.html'
                })
              }
            })
          .state('root.account-overview', {
              url: '/account-overview',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/user-center/account-overview.html',
                  controller: 'UserCenterCtrl',
                  controllerUrl: 'ngload!scripts/controller/user-center/user-center-ctrl'
                })
              }
            })
          .state('root.basic-information', {
              url: '/basic-information',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/user-center/basic-information.html',
                  controller: 'UserCenterCtrl',
                  controllerUrl: 'ngload!scripts/controller/user-center/user-center-ctrl'
                })
              }
            })
          .state('root.bankcard-management', {
              url: '/bankcard-management',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/user-center/bankcard-management.html',
                  controller: 'UserCenterCtrl',
                  controllerUrl: 'ngload!scripts/controller/user-center/user-center-ctrl'
                })
              }
            })
          .state('root.security-settings', {
              url: '/security-settings',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/user-center/security-settings.html',
                  controller: 'UserCenterCtrl',
                  controllerUrl: 'ngload!scripts/controller/user-center/user-center-ctrl'
                })
              }
            })
          .state('root.assets-overview', {
              url: '/assets-overview',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/user-center/assets-overview.html',
                  controller: 'UserCenterCtrl',
                  controllerUrl: 'ngload!scripts/controller/user-center/user-center-ctrl'
                })
              }
            })
          .state('root.recharge', {
              url: '/recharge',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/user-center/recharge.html',
                  controller: 'UserCenterCtrl',
                  controllerUrl: 'ngload!scripts/controller/user-center/user-center-ctrl'
                })
              }
            })
          .state('root.withdraw', {
              url: '/withdraw',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/user-center/withdraw.html',
                  controller: 'UserCenterCtrl',
                  controllerUrl: 'ngload!scripts/controller/user-center/user-center-ctrl'
                })
              }
            })
          .state('root.record', {
              url: '/record',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/user-center/record.html',
                  controller: 'UserCenterCtrl',
                  controllerUrl: 'ngload!scripts/controller/user-center/user-center-ctrl'
                })
              }
            })
          .state('root.investment', {
              url: '/investment',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/user-center/investment.html',
                  controller: 'UserCenterCtrl',
                  controllerUrl: 'ngload!scripts/controller/user-center/user-center-ctrl'
                })
              }
            })
          .state('root.news', {
              url: '/news',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/user-center/news.html',
                  controller: 'UserCenterCtrl',
                  controllerUrl: 'ngload!scripts/controller/user-center/user-center-ctrl'
                })
              }
            })
          .state('root.realname-authentication', {
              url: '/realname-authentication',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/user-center/realname-authentication.html',
                  controller: 'UserCenterCtrl',
                  controllerUrl: 'ngload!scripts/controller/user-center/user-center-ctrl'
                })
              }
            })
          /*---------------------------------------------  project-list  ---------------------------------------------*/
          .state('root.project-list', {
              url: '/project-list',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/project-list.html',
                  controller: 'ProjectListCtrl',
                  controllerUrl: 'ngload!scripts/controller/project/project-list-ctrl'
                })
              }
            })
          /*---------------------------------------------  project-details  ---------------------------------------------*/
          .state('root.project-details', {
              url: '/project-details',
              views: {
                '': angularAMD.route({
                  templateUrl: 'views/project-details.html',
                  controller: 'ProjectDetailsCtrl',
                  controllerUrl: 'ngload!scripts/controller/project/project-details-ctrl'
                })
              }
            })
          ;

          $urlRouterProvider.otherwise('/');

      }]);

    hongcaiApp.constant('DEFAULT_DOMAIN', '/hongcai/api/v1');

    angularAMD.bootstrap(hongcaiApp);

    return hongcaiApp;

});
