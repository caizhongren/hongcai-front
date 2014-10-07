define(['scripts/app', 'ngload!scripts/service/main/main-service'], function(hongcaiApp) {
  hongcaiApp.register.controller("loginCtrl", ["$scope", "$state", "$rootScope", "$stateParams", "MainService", function ($scope, $state, $rootScope, $stateParams, MainService) {
      $scope.loginNow = function(){
      var loginResult = MainService.userLogin.get({
            account: $scope.account,
            password: $scope.password
          },function(){
            if(loginResult.ret == 1){
              $state.go("root.account-overview");
              $rootScope.loginName = $scope.account;
              $rootScope.logout = "退出";
            }
          });
      //console.log(loginResult);
    }
    /*var projectList = MainService.projectList.get(function(response) {
      $scope.projectList = projectList.data;
      $scope.orderProp = 'id';
      $scope.currentPage = 0;
      $scope.pageSize = 15;
      $scope.data = [];
      $scope.numberOfPages = function(){
        return Math.ceil($scope.data.length / $scope.pageSize); 
      }
      for (var i = 0; i < $scope.projectList.projectList.length; i++) {
        $scope.data.push($scope.projectList.projectList[i]);
      }
    });*/

  }]);
});