'use strict';
hongcaiApp.controller('HelpCenterCtrl', ['$scope', '$state', '$rootScope', '$location', '$stateParams', '$http', 'analytics', function ($scope, $state, $rootScope, $location, $stateParams, $http, analytics) {
	$scope.menus = {
            'left': [{
            	'href': '/introduce',
                'link': 'root.help-center.introduce',
                'text': '宏财介绍'},
            {
            	'href': '/investors',
                'link': 'root.help-center.investors',
                'text': '投资介绍'},
            {
            	'href': '/account-management',
                'link': 'root.help-center.account-management',
                'text': '账户管理'},
            {
            	'href': '/safety-certification',
                'link': 'root.help-center.safety-certification',
                'text': '安全认证'},
            {
            	'href': '/law-and-policy-guarantee',
                'link': 'root.help-center.law-and-policy-guarantee',
                'text': '法律保障'},
            {
                'href': '/other-question',
                'link': 'root.help-center.other-question',
                'text': '其他问题'}]
        };

    $rootScope.selectPage = $location.path().split('/')[1];
    $scope.changeIntroduceQ1 = false;
    $scope.changeIntroduceQ2 = false;

    $scope.changeInvestorsQ1 = false;
    $scope.changeInvestorsQ2 = false;
    $scope.changeInvestorsQ3 = false;
    $scope.changeInvestorsQ4 = false;
    $scope.changeInvestorsQ5 = false;
    $scope.changeInvestorsQ6 = false;
    $scope.changeInvestorsQ7 = false;
    $scope.changeInvestorsQ8 = false;
    $scope.changeInvestorsQ9 = false;
    $scope.changeInvestorsQ10 = false;
    $scope.changeInvestorsQ11 = false;
    $scope.changeInvestorsQ12 = false;
    $scope.changeInvestorsQ13 = false;
    $scope.changeInvestorsQ14 = false;
    $scope.changeInvestorsQ15 = false;
    $scope.changeInvestorsQ16 = false;
    $scope.changeInvestorsQ17 = false;
    $scope.changeInvestorsQ18 = false;


    $scope.changeAccountQ1 = false;
    $scope.changeAccountQ2 = false;
    $scope.changeAccountQ3 = false;
    $scope.changeAccountQ4 = false;
    $scope.changeAccountQ5 = false;
    $scope.changeAccountQ6 = false;
    $scope.changeAccountQ7 = false;
    $scope.changeAccountQ8 = false;

    $scope.changeSafeQ1 = false;
    $scope.changeSafeQ2 = false;
    $scope.changeSafeQ3 = false;
    $scope.changeSafeQ4 = false;
    $scope.changeSafeQ5 = false;
    $scope.changeSafeQ6 = false;
    $scope.changeSafeQ7 = false;
    $scope.changeSafeQ8 = false;

    $scope.changeLawQ1 = false;
    $scope.changeLawQ2 = false;
    $scope.changeLawQ3 = false;
    $scope.changeLawQ4 = false;

    $scope.changePosition1 = false;
    $scope.changePosition2 = false;
    $scope.changePosition3 = false;
    $scope.changePosition4 = false;
    $scope.changePosition5 = false;
    $scope.changePosition6 = false;
    $scope.changePosition7 = false;
    $scope.changePosition8 = false;
    $scope.changePosition9 = false;
    $scope.changePosition10 = false;

    $scope.changeOther1 = false;
    $scope.changeOther2 = false;
    $scope.changeOther3 = false;

}]);
