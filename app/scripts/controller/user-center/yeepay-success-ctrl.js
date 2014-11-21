hongcaiApp.controller('YeepaySuccessCtrl', ["$scope", "$state", "$rootScope", "$stateParams", "RegisterService", "SessionService", "DEFAULT_DOMAIN", "toaster", function ($scope, $state, $rootScope, $stateParams, RegisterService, SessionService, DEFAULT_DOMAIN, toaster) {


    $scope.message = '注册成功';
    var etoken = $stateParams.etoken;
    if(etoken){
        RegisterService.activeEmail.get({etoken: etoken}, function(response){
            if (response.ret == -1){
                $scope.message = response.msg;
            }

        });
    };

}]);
 