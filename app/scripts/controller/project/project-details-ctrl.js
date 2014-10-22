hongcaiApp.controller("ProjectDetailsCtrl", ["$scope", "$state", "$rootScope", "$location", "$stateParams", "ProjectService", function ($scope, $state, $rootScope, $location, $stateParams, ProjectService) {
    var projectDetails = ProjectService.projectDetails.get({projectId: $stateParams.projectId}, function() {
        $scope.project = projectDetails.data.project;
        $scope.projectInfo = projectDetails.data.projectInfo;
        $scope.pledges = projectDetails.data.pledges;
        $scope.isAvailable = projectDetails.data.isAvailable;
        $scope.enterprise = projectDetails.data.enterprise;
        console.info($scope.projectInfo);


    

        // var project = projectDetails.data.project;
        // var projectInfo = projectDetails.data.projectInfo;
        // var pledges = projectDetails.data.pledges;

        // 椤圭洰
        // $scope.name = project.name;
        // $scope.total = project.total;
        // $scope.annualEarnings = project.annualEarnings;
        // $scope.cycle = project.cycle;
        // $scope.description = project.description;

        // 椤圭洰淇℃伅
        // $scope.financingPurpose = projectInfo.financingPurpose;
        // $scope.repaymentSource = projectInfo.repaymentSource;

        $scope.isAvailableInvest = function(project){//验证用户权限
            ProjectService.isAvailableInvest.get({amount: project.amount,projectId:project.id }, function(response) {
                if(response.ret == 1) {
                    console.info(response.data.isBalance);
                    if (response.data.flag) {
                        if (response.data.isBalance) {
                             $state.go("root.invest-verify", {projectId: response.data.projectId,amount: response.data.amount});
                        }else{
                             $state.go("root.invest-verify", {projectId: response.data.projectId,amount: response.data.amount});
                        }
                       
                    }else{
                        $state.go("root.userCenter.account-overview");
                    }
                    
                } else {
                    
                    //$scope.errorMessage = response.msg;
                    //$scope.warning = true;
                    $state.go('root.login');
                }
            });


        };
    });
    $rootScope.selectPage = $location.path().split('/')[1];

    $scope.tabs = [{
            title: '项目信息',
            url: 'one.tpl.html'
        }, {
            title: '企业信息',
            url: 'two.tpl.html'
        }, {
            title: '风控信息',
            url: 'three.tpl.html'
        }, {
            title: '相关文件',
            url: 'four.tpl.html'
        }, {
            title: '项目里程',
            url: 'five.tpl.html'
        }
    ];

    $scope.currentTab = 'one.tpl.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }

    if($(window).scrollTop()>100){
        $('body,html').animate({scrollTop:0},800);
    }

}]);

