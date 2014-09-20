define(['scripts/app', 'scripts/factory/project/project-factory'], function(app) {

    app.controller("ProjectDetailCtrl", ["$scope", "$routeParams", "ProjectFactory", function ($scope, $routeParams, ProjectFactory) {
        var projectDetail = ProjectFactory.projectDetail.get({projectId: $routeParams.projectId}, function() {
        	var project = projectDetail.data.project;
        	var projectInfo = projectDetail.data.projectInfo;
        	var pledges = projectDetail.data.pledges;

        	// 项目
        	$scope.name = project.name;
        	$scope.total = project.total;
        	$scope.annualEarnings = project.annualEarnings;
        	$scope.cycle = project.cycle;
        	$scope.description = project.description;

        	// 项目信息
        	$scope.financingPurpose = projectInfo.financingPurpose;
        	$scope.repaymentSource = projectInfo.repaymentSource;
    	});
    }]);
});