'use strict';
angular.module('hongcaiApp')
  .controller('ActivateLandingCtrl', function($scope, $state, $rootScope) {

    $scope.toOpen = function(){
      if(!$rootScope.isLogged){
          $rootScope.tologin();
          return;
        }

        if($rootScope.realNameAuthState ===1 && !$rootScope.isActive){
          $state.go("root.recharge-transfer", {amount:0, business: 'ACTIVE'});
        } else if($rootScope.realNameAuthState == 0){
          $rootScope.toRealNameAuth();
        }
    }

  });
