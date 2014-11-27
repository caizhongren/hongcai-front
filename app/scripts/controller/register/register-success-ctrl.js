hongcaiApp.controller('RegisterSuccessCtrl', ['$scope', '$timeout','$state', '$rootScope', '$stateParams', 'RegisterService', 'SessionService', 'DEFAULT_DOMAIN', 'toaster', function ($scope, $timeout, $state, $rootScope, $stateParams, RegisterService, SessionService, DEFAULT_DOMAIN, toaster) {


    $scope.message = '注册成功';
    var etoken = $stateParams.etoken;
    if(etoken){
        RegisterService.activeEmail.get({etoken: etoken}, function(response){
            if (response.ret == -1){
                $scope.message = response.msg;
            }else{
              $scope.counter = 5;
              $scope.onTimeout = function(){
                $scope.counter--;
                mytimeout = $timeout($scope.onTimeout,1000);
                if($scope.counter == 0) {
                  $state.go('root.login');
                }
              }
            }

        });
    };

}]);
 
