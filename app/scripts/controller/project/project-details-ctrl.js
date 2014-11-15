hongcaiApp.controller("ProjectDetailsCtrl", ["$scope", "$state", "$rootScope", "$location", "$stateParams", "ProjectService", "OrderService", "$modal", function ($scope, $state, $rootScope, $location, $stateParams, ProjectService, OrderService, $modal) {
    $rootScope.redirectUrl = $location.path();


    var projectDetails = ProjectService.projectDetails.get({projectId: $stateParams.projectId}, function() {
        $scope.project = projectDetails.data.project;
        $scope.projectInfo = projectDetails.data.projectInfo;
        // $scope.pledges = projectDetails.data.pledges;
        $scope.isAvailable = projectDetails.data.isAvailable;
        $scope.enterprise = projectDetails.data.enterprise;
        $scope.orderList = projectDetails.data.orderList;
        $scope.enterpriseFile = projectDetails.data.enterpriseFile;
        $scope.imageList = projectDetails.data.imageList;
        $scope.billCount = projectDetails.data.billCount;
        $scope.remainInterest = projectDetails.data.remainInterest;
        $scope.remainPrincipal = projectDetails.data.remainPrincipal;

        $scope.project.status = 6;
        $scope.project.releaseStartTime = projectDetails.data.project.releaseStartTime;
        

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

        console.log(projectDetails.data,$scope.project.releaseStartTime)
        
        $scope.isAvailableInvest = function(project){//验证用户权限
            if (project.amount <= $scope.project.minInvest){
                alert('投资金额必须大于最小投资金额' + $scope.project.minInvest + '！');
                return;
            } else if (project.amount%$scope.project.increaseAmount){
                alert('投资金额必须为' + $scope.project.increaseAmount + '的整数倍！');
                return;
            }
            ProjectService.isAvailableInvest.get({amount: project.amount,projectId:project.id }, function(response) {
                if(response.ret == 1) {
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

    $scope.statDate = new Date('2014', '10', '12', '16','30','00');
    $scope.countdownNum = ($scope.statDate.getTime() - (new Date()).getTime())/1000;

    $scope.tabs = [{
            title: '项目信息',
            // url: 'one.tpl.html'
        }, {
            title: '企业信息',
            // url: 'two.tpl.html'
        }, {
            title: '风控信息',
            // url: 'three.tpl.html'
        }, {
            title: '相关文件',
            // url: 'four.tpl.html'
        }, {
            title: '项目里程',
            // url: 'five.tpl.html'
        }
    ];

    $scope.switchTab = function (tabIndex) {
      $scope.activeTab = tabIndex;
      // $scope.currentTab = tab.url;
    }

    // $scope.currentTab = 'one.tpl.html';

    // $scope.onClickTab = function (tab) {
    //     $scope.currentTab = tab.url;
    // }

    // $scope.isActiveTab = function(tabUrl) {
    //     return tabUrl == $scope.currentTab;
    // }



    if($(window).scrollTop()>100){
        $('body,html').animate({scrollTop:0},800);
    }

    $scope.image = 'images/test/0.png';
    var myOtherModal = $modal({scope: $scope, template: 'views/modal/modal-imageEnlarge.html', show: false});
    $scope.showModal = function(image) {
        $scope.targetImg = image;
        myOtherModal.$promise.then(myOtherModal.show);
    };

}]);

