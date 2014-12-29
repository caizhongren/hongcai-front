'use strict';
hongcaiApp.controller('ActivityDetailsCtrl', ['$scope', '$state', '$rootScope', '$location', '$stateParams', 'ProjectService', 'OrderService', '$modal', '$alert', function ($scope, $state, $rootScope, $location, $stateParams, ProjectService, OrderService, $modal, $alert) {
    $rootScope.redirectUrl = $location.path();



    var activityDetails = ProjectService.activityDetails.get({projectId: $stateParams.activityId, type: $stateParams.type}, function() {
        $scope.project = activityDetails.data.project;

        $scope.projectType = activityDetails.data.type;//项目类型
        /*$scope.projectType = 3;
        console.log($scope.project)*/

        $scope.isAvailable = activityDetails.data.isAvailable;
        $scope.orderList = activityDetails.data.orderList;
        $scope.canInvestAmount = activityDetails.data.canInvestAmount;
        $scope.project.amount = $scope.canInvestAmount;
        // 处理投资记录分页
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.data = [];

        $scope.numberOfPages = function() {
          return Math.ceil($scope.data.length / $scope.pageSize);
        }
        for (var i = 0; i < $scope.orderList.length; i++) {
          $scope.data.push($scope.orderList[i]);
        }
        $scope.finished = function(){
            if($scope.project.status == 6){
                window.location.reload();
            }
        }
        $scope.isAvailableInvest = function(project){//验证用户权限
            if (project.amount <= $scope.project.minInvest){
              $scope.msg = '投资金额必须大于最小投资金额' + $scope.project.minInvest + '！';
              var alertDialog = $alert({scope: $scope, template: 'views/modal/alert-dialog.html', show: true});
              return;
            } else if (project.amount%$scope.project.increaseAmount){
              $scope.msg = '投资金额必须为' + $scope.project.increaseAmount + '的整数倍！';
              var alertDialog = $alert({scope: $scope, template: 'views/modal/alert-dialog.html', show: true});
              return;
            } else if(project.amount > $scope.canInvestAmount) {
              $scope.msg = '投资金额必须小于宏包总值' + $scope.canInvestAmount + '!';
              var alertDialog = $alert({scope: $scope, template: 'views/modal/alert-dialog.html', show: true});
              return;
            }
            ProjectService.isAvailableInvest.get({amount: project.amount,projectId:project.id }, function(response) {
              if(response.ret == 1) {
                if (response.data.flag) {
                    if (response.data.isBalance) {
                         $state.go('root.hongbao-verify', {activityId: response.data.projectId,amount: response.data.amount});
                    }else{
                         $state.go('root.hongbao-verify', {activityId: response.data.projectId,amount: response.data.amount});
                    }
                }else{
                    $state.go('root.userCenter.account-overview');
                }
              } else {
                $state.go('root.login');
              }
          });
        };
    });
    $rootScope.selectPage = $location.path().split('/')[1];


    $scope.tabs = [{
            title: '活动详情'
        }/*, {
            title: '活动规则',
        }, {
           title: '活动历程',
        }*/
    ];

    $scope.tabs_right = [{
            title: '投资记录',
        }
    ];

    $scope.switchTab = function (tabIndex) {
      $scope.activeTab = tabIndex;
    }

    $scope.switchTab_right = function (tabIndex_right) {
      $scope.activeTab_right = tabIndex_right;
    }

    $scope.image = 'images/test/0.png';
    var myOtherModal = $modal({scope: $scope, template: 'views/modal/modal-imageEnlarge.html', show: false});
    $scope.showModal = function(image) {
        $scope.targetImg = image;
        myOtherModal.$promise.then(myOtherModal.show);
    };

    $scope.goToRule = function() {
      $state.go($scope.isLogged === true ? 'root.userCenter.gift-overview' : 'root.login');
    };

}]);

