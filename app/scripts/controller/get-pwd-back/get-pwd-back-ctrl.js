hongcaiApp
.controller("GetPwdCtrl", ["$scope", "$timeout", "$state", "$rootScope", "$stateParams", "SessionService", "DEFAULT_DOMAIN", "toaster","GetPwdService", function ($scope, $timeout, $state, $rootScope, $stateParams, SessionService, DEFAULT_DOMAIN, toaster,GetPwdService) {
  	$scope.areaFlag = 1;
  	$scope.getPicCaptcha = DEFAULT_DOMAIN + "/siteUser/getPicCaptcha?";
  	$scope.refreshCode = function() {
        angular.element("#checkCaptcha").attr("src", angular.element("#checkCaptcha").attr("src").substr(0, angular.element("#checkCaptcha").attr("src").indexOf('?')) + "?code=" + Math.random());
    };
    $scope.verifyAccount = function(){
      var dataBoth=[{"CategoryId":0, "Name":"手机找回" }, {"CategoryId":1, "Name":"邮箱找回"}];
      var dataPhone=[{"CategoryId":0, "Name":"手机找回"}];
      var dataEmail=[{"CategoryId":1, "Name":"邮箱找回"}];
      if($scope.usermessage.mobile && $scope.usermessage.email){
        $scope.Category = dataBoth;
      }else if($scope.usermessage.mobile){
      $scope.Category = dataPhone;
      }else if($scope.usermessage.email){
        $scope.Category = dataEmail;
      }
      $scope.$watch('CategoryVal', function (CategoryId) {
        if(CategoryId != 0) {
          $scope.isDisplay = false;
        }else{
          $scope.isDisplay = true;
        }
      });
      $scope.areaFlag = 2;
    }
    $scope.sendMobileCaptcha = function() {
        RegisterService.sendMobileCaptcha.save({mobile: angular.element("#mobile").val() }, function(response) {
            if(response.ret == 1) {
                
            } else {
                
            }
        });
    };
}])
.controller("SetPwdCtrl", ["$scope", "$state", "$rootScope", "$stateParams", "SessionService", "DEFAULT_DOMAIN", "toaster","GetPwdService", function ($scope, $state, $rootScope, $stateParams, SessionService, DEFAULT_DOMAIN, toaster,GetPwdService) {
    $scope.areaFlag = 3;
}])
;
