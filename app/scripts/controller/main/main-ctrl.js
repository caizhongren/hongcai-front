hongcaiApp.controller("MainCtrl", ["$scope", "$stateParams", "$rootScope", "$location", "MainService", "AboutUsService", function ($scope, $stateParams, $rootScope, $location, MainService, AboutUsService) {
    var loginName;
    var logout;
    var projectList = MainService.projectList.get(function(response) {
        $scope.projectList = projectList.data.recommend;
        $scope.projectVo = projectList.data.specialRecommend[0];


       /* $scope.orderProp = 'id';
        $scope.currentPage = 0;
        $scope.pageSize = 15;
        $scope.data = [];
        $scope.numberOfPages = function(){
          return Math.ceil($scope.data.length / $scope.pageSize);
        };
        for (var i = 0; i < $scope.projectList.projectList.length; i++) {
          $scope.data.push($scope.projectList.projectList[i]);
        }*/
    });

    var indexStatistics = MainService.indexStatistics.get(function(response) {
        $scope.indexStatic = indexStatistics.data.indexStatic;
    });

    AboutUsService.textList.get({category: 1}, function(response) {
        $scope.textList = response.data;
        $scope.mediaList = [];
        for (var i = 0; i < 5; i++) {
            $scope.mediaList.push($scope.textList.textList[i]);
        }
    });

    AboutUsService.textList.get({category: 2}, function(response) {
        $scope.textList = response.data;
        $scope.noticeList = [];
        for (var i = 0; i < 5; i++) {
            $scope.noticeList.push($scope.textList.textList[i]);
        }
    });

    $rootScope.selectPage = $location.path().split('/')[1];
}]);
//JQuery 操作DOM
function change_agree_pic(x){
    var Flag = ( x.getAttribute( "src", 2 ) == "images/check_01.png" )
    x.src = Flag ? "images/check_02.png" : "images/check_01.png";
}
   
