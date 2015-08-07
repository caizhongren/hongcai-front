'use strict';
angular.module('hongcaiApp')
  .controller('SuningSuccessCtrl', ['$scope', '$rootScope','$stateParams',function ($scope,$rootScope,$stateParams) {
     console.log($stateParams);
     if($stateParams.SuccessStatus == 1){
     	$scope.sMessage = "恭喜您，成功登录！";
     }else if($stateParams.SuccessStatus == 2){
     	$scope.sMessage = "恭喜您，成功注册！";
     }
  }]);
