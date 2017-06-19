'use strict';
angular.module('hongcaiApp')
  .controller('ActivateLandingCtrl', function($scope, $state, $rootScope) {
    $rootScope.pageTitle = '银行存管介绍' + ' - 宏财网';
    //获取当天0点
    var getStartTime = function (t) {
      var start = t ? new Date(t) : new Date();  
          start.setHours(0);  
          start.setMinutes(0);  
          start.setSeconds(0);  
          start.setMilliseconds(0);  
      return Date.parse(start); 
    };
    var onlineDate = getStartTime('2017-06-29')/1000/60/60/24, //上线日
        curDate = getStartTime()/1000/60/60/24;  // 当天
    $scope.countDayFirst = onlineDate - curDate > 9 ? (onlineDate - curDate).toString().slice(0,1) : 0;
    $scope.countDaySecond = onlineDate - curDate > 9 ? (onlineDate - curDate).toString().slice(1,2) : (onlineDate - curDate);
    
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
