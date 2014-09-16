define(['scripts/app', 'scripts/factory/project/project-factory'], function(app) {
    app.controller("ProjectListCtrl", ["$scope", "ProjectFactory", function ($scope, ProjectFactory) {
        var projectList = ProjectFactory.projectList.get(function() {
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
    	});
    }]);
});