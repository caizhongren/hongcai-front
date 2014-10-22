hongcaiApp
.controller("GetPwdCtrl", ["$scope", "$timeout", "$state", "$rootScope", "$stateParams", "SessionService", "DEFAULT_DOMAIN", "toaster","GetPwdService", function ($scope, $timeout, $state, $rootScope, $stateParams, SessionService, DEFAULT_DOMAIN, toaster,GetPwdService) {
  	$scope.selectedIcon = '';
  	$scope.selectedIcons = ['Globe', 'Heart'];
  	$scope.icons = [
    	{value: 'phone', label: '手机找回'},
    	{value: 'email', label: '邮箱找回'},
  	];
  	$scope.areaFlag = 1;
  	$scope.getPicCaptcha = DEFAULT_DOMAIN + "/siteUser/getPicCaptcha?";
  	$scope.refreshCode = function() {
        angular.element("#checkCaptcha").attr("src", angular.element("#checkCaptcha").attr("src").substr(0, angular.element("#checkCaptcha").attr("src").indexOf('?')) + "?code=" + Math.random());
    };
    $scope.verifyAccount = function(){
      if(){

      }else if(){

      }else if(){

      }
      $scope.areaFlag = 2;

    }
}])
.controller("SetPwdCtrl", ["$scope", "$state", "$rootScope", "$stateParams", "SessionService", "DEFAULT_DOMAIN", "toaster","GetPwdService", function ($scope, $state, $rootScope, $stateParams, SessionService, DEFAULT_DOMAIN, toaster,GetPwdService) {
    $scope.areaFlag = 3;
}])
;
