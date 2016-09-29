/*
* @Author: yuyang
* @Date:   2016-09-26 17:22:58
* @Last Modified by:   yuyang
* @Last Modified time: 2016-09-26 17:37:34
*/

'use strict';
angular.module('hongcaiApp')
  .controller('newInviteCtrl', function($location, $scope, $rootScope, $state){
    $scope.toEarnMoney = function(){
      if($rootScope.isLogged){
        $state.go('root.userCenter.invite-rebate');
      }else {
        $state.go('root.login', {'redirectUrl': $location.path()});
      }
    }
  })
