define(['scripts/app', 'scripts/service/project/project-factory'], function(hongcaiApp) {

    hongcaiApp.register.controller("ProjectDetailsCtrl", ["$scope", "$stateParams", "ProjectFactory", function ($scope, $stateParams, ProjectFactory) {
        var projectDetails = ProjectFactory.projectDetails.get({projectId: $stateParams.projectId}, function() {
            var project = projectDetails.data.project;
            var projectInfo = projectDetails.data.projectInfo;
            var pledges = projectDetails.data.pledges;

            // 椤圭洰
            $scope.name = project.name;
            $scope.total = project.total;
            $scope.annualEarnings = project.annualEarnings;
            $scope.cycle = project.cycle;
            $scope.description = project.description;

            // 椤圭洰淇℃伅
            $scope.financingPurpose = projectInfo.financingPurpose;
            $scope.repaymentSource = projectInfo.repaymentSource;
        });
    }]);
});