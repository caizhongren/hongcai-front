hongcaiApp.controller("ProjectSponsorInstitutionCtrl", ["$scope", "$stateParams", "$location", "ProjectService" ,function ($scope, $stateParams, $location, ProjectService) {
    $scope.sortType = $stateParams.sortType || false ;

    var sponsorInstitution = ProjectService.sponsorInstitution.get({guaranteeId: $stateParams.guaranteeId}, function() {
        $scope.projectList = sponsorInstitution.data.projectList;
        $scope.guarantee = sponsorInstitution.data.guarantee;
        $scope.guaranteeProjectVo = sponsorInstitution.data.guaranteeProjectVo;
    });
    /*var projectList = ProjectService.projectList.get({status: $stateParams.status,
    												  minCycle: $stateParams.minCycle,
    												  maxCycle: $stateParams.maxCycle,
    												  minEarning: $stateParams.minEarning,
    												  maxEarning: $stateParams.maxEarning,
    											  minTotalAmount: $stateParams.minTotalAmount,
    												  maxTotalAmount: $stateParams.maxTotalAmount,
    												  sortCondition: $stateParams.sortCondition,
    												  sortType: $scope.sortType}, function() {
        $scope.status = $stateParams.status;
        $scope.minCycle = $stateParams.minCycle;
        $scope.maxCycle = $stateParams.maxCycle;
        $scope.minEarning = $stateParams.minEarning;
        $scope.maxEarning = $stateParams.maxEarning;
        $scope.minTotalAmount = $stateParams.minTotalAmount;
        $scope.maxTotalAmount = $stateParams.maxTotalAmount;
        $scope.sortCondition = $stateParams.sortCondition;
        $scope.orderProp = 'id';
        $scope.currentPage = 0;
        $scope.pageSize = 15;
        $scope.data = [];
		$scope.projectList = projectList.data;
  
	    $scope.numberOfPages = function() {
	        return Math.ceil($scope.data.length / $scope.pageSize);
	    }
	    for (var i = 0; i < $scope.projectList.projectList.length; i++) {
	        $scope.data.push($scope.projectList.projectList[i]);
	    }

	    $scope.sortType = false;
	    $scope.toggleSort = function() {
	    	$scope.sortType = !$scope.sortType;
    	};
	});*/
    // $scope.image = "images/test/0.png";
    $scope.imgs = [
        {
            title:"百度",
            src:'images/test/0.png'
        },
        {
            title:"腾讯",
            src:'images/test/1.png'
        },
        {
            title:"搜狐",
            src:'images/test/2.png'
        },
        {
            title:"网易",
            src:'images/test/3.png'
        },
        {
            title:"优酷",
            src:'images/test/4.png'
        },
        {
            title:"土豆",
            src:'images/test/5.png'
        },
        {
            title:"雅虎",
            src:'images/test/6.png'
        },
        {
            title:"网易",
            src:'images/test/7.png'
        },
        {
            title:"优酷",
            src:'images/test/8.png'
        },
        {
            title:"土豆",
            src:'images/test/9.png'
        },
        {
            title:"雅虎",
            src:'images/test/10.png'
        }
    ];

    $(function(){
        $("#slider").sudySlider($scope.imgs);
    });

    if($(window).scrollTop()>100){
        $('body,html').animate({scrollTop:0},800);
    }

}]);



