hongcaiApp.controller('RegisterSuccessCtrl', ["$scope", "$state", "$rootScope", "$stateParams", "RegisterService", "SessionService", "DEFAULT_DOMAIN", "toaster", function ($scope, $state, $rootScope, $stateParams, RegisterService, SessionService, DEFAULT_DOMAIN, toaster) {


    $scope.message = '注册成功';
    var token = $stateParams.token;
    if(token){
        RegisterService.activeEmail.get({token: token}, function(response){
            if (response.ret == -1){
                $scope.message = response.msg;
            }

        });
    };

}]);
 
