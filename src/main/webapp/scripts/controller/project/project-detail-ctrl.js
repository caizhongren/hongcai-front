define(['scripts/app', 'scripts/factory/project/project-factory'], function(app) {

    app.controller("ProjectDetailCtrl", ["$scope", "ProjectFactory", '$routeParams', function ($scope, $routeParams, ProjectFactory) {
    	$scope.projectId = $routeParams.projectId;
        var projectDetail = ProjectFactory.projectDetail.get({projectId: $routeParams.projectId}, function() {
        	
    	});
    }]);
});