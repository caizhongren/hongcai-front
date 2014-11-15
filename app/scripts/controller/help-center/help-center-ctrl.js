hongcaiApp.controller("HelpCenterCtrl", ["$scope", "$state", "$rootScope", "$location", "$stateParams", function ($scope, $state, $rootScope, $location, $stateParams) {
	$scope.menus = {
            "left": [{
            	"href": "/introduce",
                "link": "root.help-center.introduce",
                "text": "宏财介绍"},
            {
            	"href": "/investors",
                "link": "root.help-center.investors",
                "text": "投资介绍"},
            {
            	"href": "/account-management",
                "link": "root.help-center.account-management",
                "text": "账户管理"},
            {
            	"href": "/safety-certification",
                "link": "root.help-center.safety-certification",
                "text": "安全认证"},
            {
            	"href": "/law-and-policy-guarantee",
                "link": "root.help-center.law-and-policy-guarantee",
                "text": "法律保障"}]
        };

    $rootScope.selectPage = $location.path().split('/')[1];
    $scope.changeIntroduceQ1 = false;
    $scope.changeIntroduceQ2 = false;
    $scope.changeIntroduceQ3 = false;
    $scope.changeIntroduceQ4 = false;
    $scope.changeInvestorsQ1 = false;
    $scope.changeInvestorsQ2 = false;
    $scope.changeInvestorsQ3 = false;
    $scope.changeInvestorsQ4 = false;
    $scope.changeInvestorsQ5 = false;
    $scope.changeInvestorsQ6 = false;
    $scope.changeInvestorsQ7 = false;
    $scope.changeAccountQ1 = false;
    $scope.changeAccountQ2 = false;
    $scope.changeAccountQ3 = false;
    $scope.changeAccountQ4 = false;
    $scope.changeAccountQ5 = false;
    $scope.changeAccountQ6 = false;
    $scope.changeAccountQ7 = false;
    $scope.changeSafeQ1 = false;
    $scope.changeSafeQ2 = false;
    $scope.changeSafeQ3 = false;
    $scope.changeSafeQ4 = false;
    $scope.changeSafeQ5 = false;
    $scope.changeLawQ1 = false;
    $scope.changeLawQ2 = false;
    $scope.changeLawQ3 = false;
    $scope.changeLawQ4 = false;

    // if($(window).scrollTop()>100){
    //     $('body,html').animate({scrollTop:0},800);
    // }

}]);
