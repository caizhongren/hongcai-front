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
    var wait=60;
    function time(o) {
        if ( wait == 0 ) {
            o.removeAttribute("disabled");          
            o.value = '获取验证码';
            if(o.className == 'get-verify-button verify-index grey'){
                o.className = 'get-verify-button verify-index';
            }else if(o.className == 'white-button grey'){
                o.className = 'white-button';
            }
            wait = 60;
        }else{
            o.setAttribute("disabled", true);
            if(o.className == 'get-verify-button verify-index'){
                o.className = 'get-verify-button verify-index grey';
            }else if(o.className == 'white-button'){
                o.className = 'white-button grey';
            }
            o.value = wait + "s 后重新发送";
            wait--;
            setTimeout(function() {
                time(o)
            },
            1000)
        }
    }    
