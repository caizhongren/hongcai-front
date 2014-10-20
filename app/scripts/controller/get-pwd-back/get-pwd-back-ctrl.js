hongcaiApp
.controller("GetPwdCtrl", ["$scope", "$timeout", "$state", "$rootScope", "$stateParams", "SessionService", "DEFAULT_DOMAIN", "toaster","GetPwdService", function ($scope, $timeout, $state, $rootScope, $stateParams, SessionService, DEFAULT_DOMAIN, toaster,GetPwdService) {
  	$scope.selectedIcon = '';
  	$scope.selectedIcons = ['Globe', 'Heart'];
  	$scope.icons = [
    	{value: 'phone', label: '手机找回'},
    	{value: 'email', label: '邮箱找回'},
  	];
  	$scope.areaFlag = 3;
  	$scope.getPicCaptcha = DEFAULT_DOMAIN + "/siteUser/getPicCaptcha?";
  	$scope.refreshCode = function() {
        angular.element("#checkCaptcha").attr("src", angular.element("#checkCaptcha").attr("src").substr(0, angular.element("#checkCaptcha").attr("src").indexOf('?')) + "?code=" + Math.random());
    };
    $scope.verifyAccount = function(){
      $scope.areaFlag = 2;
    }
    $scope.setPhoneNewPwd = function(){
      $scope.areaFlag = 4;
      $scope.seconds = 5;
      function timer($timeout){
        console.log($scope.seconds);

        var countUp = function() {
            $scope.seconds--;
            $timeout(countUp, 1000);
        }

        $timeout(countUp, 1000);
      }
      
    }
}])
.controller("SetPwdCtrl", ["$scope", "$state", "$rootScope", "$stateParams", "SessionService", "DEFAULT_DOMAIN", "toaster","GetPwdService", function ($scope, $state, $rootScope, $stateParams, SessionService, DEFAULT_DOMAIN, toaster,GetPwdService) {
    $scope.areaFlag = 3;
}])
;
