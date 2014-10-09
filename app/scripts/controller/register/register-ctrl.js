
    hongcaiApp.controller("RegisterCtrl", ["$scope", "$stateParams", "RegisterService", function ($scope, $stateParams, RegisterService) {
         
         $scope.submitRegisterMobile = function(user) {
            RegisterService.saveRegister.save({name: user.name, type:0, account: user.mobile, password: user.password }, function(response) {
                if(response.msg == "success") {
                    $state.go('root.account-overview');
                } else {
                    alert(0);
                }
            });
        }

         $scope.submitRegisterMail = function(user) {
            RegisterService.saveRegister.save({name: user.name, type:1, account: user.email, password: user.password }, function(response) {
                if(response.msg == "success") {
                    $state.go('root.account-overview');
                } else {
                    alert(0);
                }
            });
        }

        $scope.checkPassword = function () {
            console.info("asd");
            $scope.registerForm.repeatPassword.$error.dontMatch = $scope.user.password !== $scope.user.repeatPassword;
        };

    }]);
    
