function MainCtrl($scope) {
	$scope.main = "this is a main page";
	$scope.awesomeThings = ['HTML5 Boilerplate','AngularJS','Karma'];
}

function AboutCtrl($scope) {
	$scope.about = "this is a about page";
}

function ProjectListCtrl($scope, ProjectFactory) {
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
}

function ProjectDetailCtrl($scope, $routeParams, ProjectFactory) {
	var project = ProjectFactory.project.get({id: $routeParams.id}, function() {
		$scope.project = eval('(' + project.data + ')');
	});
}


