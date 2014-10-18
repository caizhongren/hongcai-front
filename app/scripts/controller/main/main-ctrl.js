hongcaiApp.controller("MainCtrl", ["$scope", "$stateParams", "MainService", function ($scope, $stateParams, MainService) {
    var loginName;
    var logout;
    var projectList = MainService.projectList.get(function(response) {
        $scope.projectList = projectList.data;
        $scope.orderProp = 'id';
        $scope.currentPage = 0;
        $scope.pageSize = 15;
        $scope.data = [];
        $scope.numberOfPages = function(){
          return Math.ceil($scope.data.length / $scope.pageSize);
        };
        for (var i = 0; i < $scope.projectList.projectList.length; i++) {
          $scope.data.push($scope.projectList.projectList[i]);
        }
    });

}]);
//JQuery 操作DOM
function change_agree_pic(x){
    var Flag = ( x.getAttribute( "src", 2 ) == "images/check_01.png" )
    x.src = Flag ? "images/check_02.png" : "images/check_01.png";
}
   
