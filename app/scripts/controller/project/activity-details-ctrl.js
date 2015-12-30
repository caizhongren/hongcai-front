'use strict';
angular.module('hongcaiApp')
  .controller('ActivityDetailsCtrl', function($scope, $state, $rootScope, $location, $stateParams, ProjectService, OrderService, $modal, $alert, $timeout, toaster, DateUtils) {
  $rootScope.redirectUrl = $location.path();

  var activityDetails = ProjectService.activityDetails.get({
    number: $stateParams.number,
    type: $stateParams.type
  }, function() {
    if (activityDetails.ret === 1) {
      $scope.statSecond = parseInt(activityDetails.data.countDownTime / 1000 + 1) || -1;
      $scope.onTimeout = function() {
        $scope.statSecond--;
        mytimeout = $timeout($scope.onTimeout, 1000);
        var time = DateUtils.toHourMinSeconds();

        $scope.statDay = time.day + '天';
        $scope.statTime = time.hour + '时,' + time.min + '分,' + time.seconds + '秒';
        if ($scope.statSecond === 0) {
          ProjectService.activityDetails.get({
            number: $stateParams.number
          }, function(response) {
            if (response.ret === 1) {
              $scope.project = response.data.project;
              $scope.progress = ($scope.project.soldStock + $scope.project.occupancyStock) * 100/$scope.project.countInvest;
            }
          });
          $state.reload();
        }
      };
      var mytimeout = $timeout($scope.onTimeout, 1000);
      $scope.$on('$stateChangeStart', function() {
        $timeout.cancel(mytimeout);
      });
      $scope.project = activityDetails.data.project;
      $scope.projectType = activityDetails.data.type; //项目类型
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
      };
      for (var i = 0; i < $scope.orderList.length; i++) {
        $scope.data.push($scope.orderList[i]);
      }
    } else {
      toaster.pop('warning', activityDetails.msg);
    }
  });

  $scope.isAvailableInvest = function(project) { //验证用户权限
    if (project.amount <= $scope.project.minInvest) {
      $scope.msg = '投资金额必须大于最小投资金额' + $scope.project.minInvest + '！';
      $alert({
        scope: $scope,
        template: 'views/modal/alert-dialog.html',
        show: true
      });
      return;
    } else if (project.amount % $scope.project.increaseAmount) {
      $scope.msg = '投资金额必须为' + $scope.project.increaseAmount + '的整数倍！';
      $alert({
        scope: $scope,
        template: 'views/modal/alert-dialog.html',
        show: true
      });
      return;
    } else if (project.amount > $scope.canInvestAmount) {
      $scope.msg = '投资金额必须小于宏包总值' + $scope.canInvestAmount + '!';
      $alert({
        scope: $scope,
        template: 'views/modal/alert-dialog.html',
        show: true
      });
      return;
    }
    ProjectService.isAvailableInvest.get({
      amount: project.amount,
      projectId: project.id
    }, function(response) {
      if (response.ret === 1) {
        if (response.data.flag) {
          if (response.data.isBalance) {
            $state.go('root.hongbao-verify', {
              activityId: response.data.projectId,
              amount: response.data.amount
            });
          } else {
            $state.go('root.hongbao-verify', {
              activityId: response.data.projectId,
              amount: response.data.amount
            });
          }
        } else {
          $state.go('root.userCenter.account-overview');
        }
      } else {
        $state.go('root.login');
      }
    });
  };

  $rootScope.selectPage = $location.path().split('/')[1];


  $scope.tabs = [{
    title: '活动详情'
  }];

  $scope.tabsRight = [{
    title: '投资记录',
  }];

  $scope.switchTab = function(tabIndex) {
    $scope.activeTab = tabIndex;
  };

  $scope.switchTabRight = function(tabIndexRight) {
    $scope.activeTabRight = tabIndexRight;
  };

  $scope.image = 'images/test/0.png';
  var myOtherModal = $modal({
    scope: $scope,
    template: 'views/modal/modal-imageEnlarge.html',
    show: false
  });
  $scope.showModal = function(image) {
    $scope.targetImg = image;
    myOtherModal.$promise.then(myOtherModal.show);
  };

  $scope.goToRule = function() {
    $state.go($scope.isLogged === true ? 'root.userCenter.gift-overview' : 'root.login');
  };

  $scope.toLogin = function(){
      var thisUrl = $location.path();
      $location.path('/login').search({redirectUrl: thisUrl});
  };
});

