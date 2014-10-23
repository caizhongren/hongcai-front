hongcaiApp
.controller("GetPwdCtrl", ["$scope", "$timeout", "$state", "$rootScope", "$stateParams", "SessionService", "DEFAULT_DOMAIN", "toaster","GetPwdService", function ($scope, $timeout, $state, $rootScope, $stateParams, SessionService, DEFAULT_DOMAIN, toaster,GetPwdService) {
  	$scope.areaFlag = 1;
  	$scope.getPicCaptcha = DEFAULT_DOMAIN + "/siteUser/getPicCaptcha?";
  	$scope.refreshCode = function() {
        angular.element("#checkCaptcha").attr("src", angular.element("#checkCaptcha").attr("src").substr(0, angular.element("#checkCaptcha").attr("src").indexOf('?')) + "?code=" + Math.random());
    };
    
    $scope.verifyAccount = function(){
      var dataBoth=[
        {"CategoryId":0, "Name":"手机找回" },
        {"CategoryId":1, "Name":"邮箱找回"}
      ] ;
      var dataPhone=[
        {"CategoryId":0, "Name":"手机找回" }
      ] ;
      var dataEmail=[
        {"CategoryId":1, "Name":"邮箱找回"}
      ] ;
      if($scope.usermessage.mobile && $scope.usermessage.email){
        $scope.Category1= dataBoth;
        $scope.wayGetFlag = 1;
        $scope.findWay = '手机';
        $scope.tipsFlag = 1;
        $scope.wayBack = '手机找回';
      }else if($scope.usermessage.mobile){
        $scope.Category1= dataPhone;
        $scope.wayGetFlag = 1;
        $scope.findWay = '手机';
        $scope.tipsFlag = 1;
        $scope.wayBack = '手机找回';
      }else if($scope.usermessage.email){
        $scope.Category1= dataEmail;
        $scope.wayGetFlag = 2;
        $scope.findWay = '邮箱';
        $scope.tipsFlag = 2;
        $scope.wayBack = '邮箱找回';
      }
      $scope.$watch('Category1Val', function (newValue) {
        if($scope.CategoryId == 1){
          console.log("1");
          $scope.wayGetFlag = 2;
        $scope.findWay = '邮箱';
        $scope.tipsFlag = 2;
        $scope.wayBack = '邮箱找回';
        }else{
          console.log("0");
          $scope.wayGetFlag = 1;
        $scope.findWay = '手机';
        $scope.tipsFlag = 1;
        $scope.wayBack = '手机找回';
        }
        //$scope.Category2Val = $scope.Category1.Product[0];//對應組的第一個
      })
      $scope.areaFlag = 2;
    }
}])
.controller("SetPwdCtrl", ["$scope", "$state", "$rootScope", "$stateParams", "SessionService", "DEFAULT_DOMAIN", "toaster","GetPwdService", function ($scope, $state, $rootScope, $stateParams, SessionService, DEFAULT_DOMAIN, toaster,GetPwdService) {
    $scope.areaFlag = 3;
}])
;
