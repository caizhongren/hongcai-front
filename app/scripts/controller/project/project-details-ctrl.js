'use strict';
hongcaiApp.controller('ProjectDetailsCtrl', ['$scope', '$state', '$rootScope', '$location', '$stateParams', 'ProjectService', 'OrderService', '$modal', '$alert', function ($scope, $state, $rootScope, $location, $stateParams, ProjectService, OrderService, $modal, $alert) {
    $rootScope.redirectUrl = $location.path();


    var projectDetails = ProjectService.projectDetails.get({projectId: $stateParams.projectId}, function() {
        $scope.project = projectDetails.data.project;
        $scope.projectInfo = projectDetails.data.projectInfo;
        $scope.projectRank = projectDetails.data.projectRank;

        console.log(projectDetails)

        // $scope.pledges = projectDetails.data.pledges;
        $scope.isAvailable = projectDetails.data.isAvailable;
        $scope.enterprise = projectDetails.data.enterprise;
        $scope.orderList = projectDetails.data.orderList;
        $scope.enterpriseThumbnailFileList = projectDetails.data.enterpriseThumbnailFileList;
        $scope.enterpriseOriginalFileList = projectDetails.data.enterpriseOriginalFileList;
        $scope.contractOriginalFileList = projectDetails.data.contractOriginalFileList;
        $scope.contractThumbnailFileList = projectDetails.data.contractThumbnailFileList;
        $scope.preRepaymentList = projectDetails.data.preRepaymentList;
        
        $scope.billCount = projectDetails.data.billCount;
        $scope.remainInterest = projectDetails.data.remainInterest;
        $scope.remainPrincipal = projectDetails.data.remainPrincipal;

        /*$scope.isAvailable = 0;
        $scope.project.progress = 90;
        $scope.securityStatus.realNameAuthStatus =1;
        $scope.securityStatus.mobileStatus =1;
        $scope.securityStatus.emailStatus = 1;*/ /*控制未完成订单提示框弹出的假数据*/

        // console.log($scope.project.publishTime)
        // console.log($scope.project.status)
       // console.log($scope.preRepaymentList)

        $scope.dateArray = $scope.project.releaseStartTime.split('-');
        $scope.day = $scope.dateArray[2].split(' ')[0];
        $scope.timeArray = $scope.dateArray[2].split(' ')[1].split(':');
        $scope.statDate = new Date($scope.dateArray[0], $scope.dateArray[1]-1, $scope.day, $scope.timeArray[0],$scope.timeArray[1],$scope.timeArray[2]+30);
        
        console.log($scope.statDate);

        /*$scope.statDate = new Date('2014', '10', '21', '20','17','10');*///假数据

        $scope.finished = function(){
            if($scope.project.status == 6){
                window.location.reload();
            }
        }
       

        $scope.isAvailableInvest = function(project){//验证用户权限
            if (project.amount <= $scope.project.minInvest){
                // alert('投资金额必须大于最小投资金额' + $scope.project.minInvest + '！');
                // $scope.msg = '投资金额必须大于最小投资金额' + $scope.project.minInvest + '！';
                $scope.msg = '投资金额必须大于最小投资金额:100元！';
                var alertDialog = $alert({scope: $scope, template: 'views/modal/alert-dialog.html', show: true});
                return;
            } else if (project.amount%$scope.project.increaseAmount){
                // alert('投资金额必须为' + $scope.project.increaseAmount + '的整数倍！');
                $scope.msg = '投资金额必须为' + $scope.project.increaseAmount + '的整数倍！';
                var alertDialog = $alert({scope: $scope, template: 'views/modal/alert-dialog.html', show: true});
                return;
            }
            ProjectService.isAvailableInvest.get({amount: project.amount,projectId:project.id }, function(response) {
                if(response.ret == 1) {
                    if (response.data.flag) {
                        if (response.data.isBalance) {
                             $state.go('root.invest-verify', {projectId: response.data.projectId,amount: response.data.amount});
                        }else{
                             $state.go('root.invest-verify', {projectId: response.data.projectId,amount: response.data.amount});
                        }

                    }else{
                        $state.go('root.userCenter.account-overview');
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
            title: '项目历程',
            // url: 'five.tpl.html'
        }
    ];

    $scope.tabs_right = [{
            title: '投资记录',
            // url: 'one.tpl.html'
        }, {
            title: '还款计划',
            // url: 'two.tpl.html'
        }
    ];

    $scope.switchTab = function (tabIndex) {
      $scope.activeTab = tabIndex;
      // $scope.currentTab = tab.url;
    }

    $scope.switchTab_right = function (tabIndex_right) {
      $scope.activeTab_right = tabIndex_right;
      // $scope.currentTab = tab.url;
    }

    // $scope.currentTab = 'one.tpl.html';

    // $scope.onClickTab = function (tab) {
    //     $scope.currentTab = tab.url;
    // }

    // $scope.isActiveTab = function(tabUrl) {
    //     return tabUrl == $scope.currentTab;
    // }

    $scope.image = 'images/test/0.png';
    var myOtherModal = $modal({scope: $scope, template: 'views/modal/modal-imageEnlarge.html', show: false});
    $scope.showModal = function(image) {
        $scope.targetImg = image;
        myOtherModal.$promise.then(myOtherModal.show);
    };

    


}]);

