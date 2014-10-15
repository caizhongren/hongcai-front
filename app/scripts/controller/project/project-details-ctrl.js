hongcaiApp.controller("ProjectDetailsCtrl", ["$scope", "$stateParams", "ProjectService", function ($scope, $stateParams, ProjectService) {
    var projectDetails = ProjectService.projectDetails.get({projectId: $stateParams.projectId}, function() {
        $scope.project = projectDetails.data.project;
        $scope.projectInfo = projectDetails.data.projectInfo;
        $scope.pledges = projectDetails.data.pledges;


    

        // var project = projectDetails.data.project;
        // var projectInfo = projectDetails.data.projectInfo;
        // var pledges = projectDetails.data.pledges;

        // 椤圭洰
        // $scope.name = project.name;
        // $scope.total = project.total;
        // $scope.annualEarnings = project.annualEarnings;
        // $scope.cycle = project.cycle;
        // $scope.description = project.description;

        // 椤圭洰淇℃伅
        // $scope.financingPurpose = projectInfo.financingPurpose;
        // $scope.repaymentSource = projectInfo.repaymentSource;

        $scope.isAvailableInvest = function(project){//验证用户权限
        ProjectService.isAvailableInvest.get({amount: project.amount,projectId:project.id }, function(response) {
            if(response.msg == 'success') {
                if (response.data.flag) {
                    state.go("root.");
                }else{
                    alert("cccccc");
                }
                
            } else {
                
                //$scope.errorMessage = response.msg;
                //$scope.warning = true;
                $state.go('root.login');
            }
        });
    };
    });
}]);

