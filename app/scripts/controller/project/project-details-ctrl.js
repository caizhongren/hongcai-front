'use strict';
angular.module('hongcaiApp')
  .controller('ProjectDetailsCtrl', function($scope, $interval, $state, $rootScope, $location, $stateParams, ProjectService, OrderService, $modal, $alert, toaster, $timeout, ipCookie, MainService, DateUtils, AboutUsService, projectStatusMap) {
    // $rootScope.redirectUrl = $location.path();
    $scope.chk = true;
    $scope.checkFlag = true;
    $scope.check = function(val) {
      $scope.checkFlag = !val ? true : false;
    };

    $scope.projectStatusMap = projectStatusMap;


    $scope.getProjectDetails = function() {
      var projectDetails = ProjectService.projectDetails.get({
        number: $stateParams.number
      }, function() {
        if (projectDetails.ret === 1) {
          $rootScope.pageTitle = projectDetails.data.project.name + ' - 要理财，上宏财!';

          $scope.project = projectDetails.data.project;
          $scope.repaymentTypeMap = projectDetails.data.repaymentTypeMap;
          $scope.countdown = projectDetails.data.countDownTime;
          $scope.project._timeDown = DateUtils.toHourMinSeconds($scope.countdown);

          var interval = $interval(function(){
            $scope.countdown -= 1000;
            if ($scope.countdown <= 0 && $scope.project.status == 6){
              $state.reload();
            }
            $scope.project._timeDown = DateUtils.toHourMinSeconds($scope.countdown);
          }, 1000);

          
          $scope.$on('$stateChangeStart', function() {
            $interval.cancel(interval);
          });
          
          $scope.categoryCode = projectDetails.data.category.code;
          if ($scope.categoryCode === '0112' || $scope.categoryCode === '0113' || $scope.categoryCode === '0114') {
            $scope.tabs = [{
              title: '项目信息',
            }, {
              title: '企业信息',
            }, {
              title: '相关文件',
            }];
          } else if ($scope.categoryCode === '0115') {
            $scope.tabs = [{
              title: '项目信息',
            }, {
              title: '相关文件',
            }];
          } else if($scope.categoryCode === '0116'){
            $scope.tabs = [{
              title: '项目信息',
            }, {
              title: '风控信息',
            }, {
              title: '相关文件',
            }, {
              title: '项目历程',
            }];
          }else {
            $scope.tabs = [{
              title: '项目信息',
            }, {
              title: '企业信息',
            }, {
              title: '风控信息',
            }, {
              title: '相关文件',
            }, {
              title: '项目历程',
            }];
          }

          $scope.repaymentDate = projectDetails.data.repaymentDate;
          $scope.project.progress = ($scope.project.soldStock + $scope.project.occupancyStock) * 100/$scope.project.countInvest;
          $scope.totalType = $scope.project.status === 11 && $scope.project.progress < 100 ? '可预约金额' : '可投金额';
          /**
           * 项目可投金额
           */
          $scope.projectInvestNum = $scope.project.currentStock * $scope.project.increaseAmount;
          /**
           * 用户可用金额
           */
          if ($rootScope.account) {
            if ($scope.project.status === 11) {
              $scope.userCanInvestNum = $scope.project.reserveAmount > $rootScope.account.balance * 10 ? $rootScope.account.balance * 10 : $scope.project.reserveAmount;
            } else {
              $scope.userCanInvestNum = $scope.projectInvestNum > $rootScope.account.balance ? $rootScope.account.balance : $scope.projectInvestNum;
            }
          } else {
            $scope.userCanInvestNum = 0;
          }
          $scope.projectInfo = projectDetails.data.projectInfo;
          $scope.projectRank = projectDetails.data.projectRank;

          $scope.isAvailable = projectDetails.data.isAvailable;
          
          $scope.preRepaymentList = projectDetails.data.preRepaymentList;
          $scope.billCount = projectDetails.data.billCount;
          $scope.remainInterest = projectDetails.data.remainInterest;
          $scope.remainPrincipal = projectDetails.data.remainPrincipal;
          $scope.baseFileUrl = projectDetails.data.baseFileUrl;
          /**
           * 处理投资记录分页
           */
          $scope.currentPage = 0;
          $scope.pageSize = 10;
          $scope.data = [];

          $scope.projectOrders($scope.project.id, $scope.project.type);
          $scope.projectFiles($scope.project.id);
          $scope.projectTexts($scope.project.id);
          $scope.enterpriseInfo($scope.project.enterpriseId);
          
        } else if (projectDetails.code === -1054) {
          $state.go('root.project-list-query-no');
        } else {
          toaster.pop('warning', projectDetails.msg);
        }
      });
    };
  
    /**
     * 项目订单列表
     */
    $scope.projectOrders = function(projectId, projectType){
      ProjectService.projectOrders.get({
        projectId: projectId,
        projectType: projectType
      }, function(response){
        if(response.ret !== -1){
          $scope.orderList = response.data.orderList;
          $scope.numberOfPages = function() {
            return Math.ceil($scope.data.length / $scope.pageSize);
          };
          for (var i = 0; i < $scope.orderList.length; i++) {
            $scope.data.push($scope.orderList[i]);
          }
        }
        
      });
    }


    /**
     * 项目文件信息
     */
    $scope.projectFiles = function(projectId){
      ProjectService.projectFiles.get({
        projectId: projectId
      }, function(response){
        $scope.enterpriseThumbnailFileList = response.data.enterpriseThumbnailFileList;
        $scope.enterpriseOriginalFileList = response.data.enterpriseOriginalFileList;
        $scope.contractOriginalFileList = response.data.contractOriginalFileList;
        $scope.contractThumbnailFileList = response.data.contractThumbnailFileList;
      });
    }

    /**
     * 借款企业信息
     */
    $scope.enterpriseInfo = function(enterpriseId){
      ProjectService.getEnterpriseById.get({
        enterpriseId: enterpriseId
      }, function(response){
        $scope.enterprise = response.data.enterprise;
      });
    }

    /**
     * 媒体报道
     */
    $scope.projectTexts = function(projectId){
      ProjectService.projectTexts.get({
        projectId: projectId
      }, function(response){
        $scope.mediaList = response.data.texts;
      });
    }

    /**
     * 项目预约记录
     */
    $scope.getReserveRecords = function() {
      ProjectService.getReserveRecords.get({
        number: $stateParams.number
      }, function(response) {
        if (response.ret === 1) {
          $scope.reserveData = response.data;
          $scope.reserveOrders = response.data.reserveOrders;
          $scope.singleReserveCounts = $scope.reserveOrders.length;
          for (var i = 0; i < $scope.singleReserveCounts; i++) {
            var $index = $scope.reserveOrders[i].status;
            $scope.reserveOrders[i].statusTxt = response.data.statusMap[$index];
          }
        }
      });
    };

    

    /**
     * 获取预约收益
     */
    $scope.getProfit = function(project) {
      if ($rootScope.autoTransfer !== 1) {
        $scope.msg = '需要完成自动投标授权，请到安全中心设置中授权。';
        $alert({
          scope: $scope,
          template: 'views/modal/alert-autoTransfer.html',
          show: true
        });
        return;
      }
      $scope.alert = {
        toReserveAmount: project.toReserveAmount
      };
      if ($scope.checkFlag) {
        if (project.toReserveAmount > $scope.userCanInvestNum) {
          $scope.msg = $scope.project.reserveAmount > $rootScope.account.balance * 10 ? '您输入的金额高于可用余额！' : '您输入的金额高于可预约金额！';
          $alert({
            scope: $scope,
            template: 'views/modal/alert-dialog.html',
            show: true
          });
        } else {
          ProjectService.getProfit.get({
            reserveAmount: project.toReserveAmount,
            projectId: project.id
          }, function(response) {
            if (response.ret === 1) {
              $scope.reserveProfit = response.data.reserveProfit;
              $alert({
                scope: $scope,
                template: 'views/modal/alert-reserve-success.html',
                show: true
              });

            } else {
              $scope.msg = response.msg;
              $alert({
                scope: $scope,
                template: 'views/modal/alert-dialog.html',
                show: true
              });
            }
          });
        }

      } else {
        $scope.msg = '您还没有同意《项目预约规则》';
        $alert({
          scope: $scope,
          template: 'views/modal/alert-dialog.html',
          show: true
        });
        return;
      }
    };
    /**
     * 完善资料
     */
    $scope.toRealNameAuth = function() {
      $alert({
        scope: $scope,
        template: 'views/modal/modal-realNameAuth.html',
        show: true
      });
    };

    /**
     * 跳到充值页面
     */
    $scope.toRecharge = function() {
      if ($rootScope.securityStatus.realNameAuthStatus + $rootScope.autoTransfer >= 1) {
        $modal({
          scope: $scope,
          template: 'views/modal/modal-toRecharge.html',
          show: true
        });
      } else {
        $scope.toRealNameAuth();
      }
    };
    /**
     * 显示协议
     */
    $scope.showAgreement = function() {
      $modal({
        scope: $scope,
        template: 'views/modal/alert-toShowActivityruleAgreement.html',
        show: true
      });
    };

    /**
     * 自定义dialog
     */
    $scope.alertDialog = function(msg){
      $scope.msg = msg;
      $alert({
        scope: $scope,
        template: 'views/modal/alert-dialog.html',
        show: true
      });
    }

    /**
     * 投资或者预约
     */
    $scope.toInvest = function(project) { 
      if (project.inviteMobile) {
        $rootScope.inviteMobile = project.inviteMobile;
      }
      $scope.amount = project.status === 11 ? project.toReserveAmount : project.amount;
      if($scope.amount > $rootScope.account.balance){
        $scope.alertDialog('余额不足，请先充值');
        return;
      } else if ($scope.amount < $scope.project.minInvest) {
        $scope.alertDialog('投资金额必须大于' + $scope.project.minInvest +'元！');
        return;
      } else if ($scope.amount % $scope.project.increaseAmount) {
        $scope.alertDialog('投资金额必须为' + $scope.project.increaseAmount + '的整数倍！');
        return;
      }

      if (project.status === 11) {
        /**
         * 预约项目投资
         */
        ProjectService.reserve.get({
          reserveAmount: project.toReserveAmount,
          projectId: project.id,
          inviteMobile: project.inviteMobile
        }, function(response) {
          if (response.ret === 1) {
            angular.element('.alert').remove();
            angular.element('.mask_layer').remove();
            var balance = $rootScope.account.balance;
            $rootScope.account.balance = balance - (project.toReserveAmount / 10);
            $scope.getProjectDetails(); //更新投资模块
            $scope.getReserveRecords(); //更新预约记录
          } else {
            $scope.msg = response.msg;
            $alert({
              scope: $scope,
              template: 'views/modal/alert-dialog.html',
              show: true
            });
          }
        });
      } else {
        /**
         * 非预约项目投资
         */
        if(!$rootScope.account || $rootScope.account.balance < project.amount){
          $scope.msg = '账户余额不足';
          $alert({
            scope: $scope,
            template: 'views/modal/alert-dialog.html',
            show: true
          });
        }
        
        OrderService.investVerify.get({
          projectId: project.id,
          amount: project.amount
        }, function(response) {
          if (response.ret === 1) {
            $state.go('root.invest-verify', {
              projectId: project.id,
              amount: project.amount
            });
          } else if (response.ret === -1) {
            if (response.code === 1) {
              $scope.msg = '抱歉，已经卖光了。';
              $modal({
                scope: $scope,
                template: 'views/modal/alert-dialog.html',
                show: true
              });
            } else {
              $scope.msg = response.msg;
              $modal({
                scope: $scope,
                template: 'views/modal/alert-dialog.html',
                show: true
              });
            }
          }
        });
      }
    };
    $rootScope.selectPage = $location.path().split('/')[1];

    $scope.tabsRight = [{
      title: '投资记录',
      // url: 'one.tpl.html'
    }, {
      title: '还款计划',
      // url: 'two.tpl.html'
    }];

    $scope.tabsRightReserve = [{
      title: '当前预约',
      // url: 'one.tpl.html'
    }, {
      title: '我的预约记录',
      // url: 'two.tpl.html'
    }];

    /*$scope.switchTab = function(tabIndex) {
      $scope.activeTab = tabIndex;
      // $scope.currentTab = tab.url;
    };*/

    $scope.toggle = {};
    $scope.toggle.switchTab = function(tabIndex) {
      $scope.toggle.activeTab = tabIndex;
    };


    $scope.toggle.switchTabRight = function(tabIndexRight) {
      $scope.toggle.activeTabRight = tabIndexRight;
      // $scope.currentTab = tab.url;
    };

    $scope.toggle.switchTabRightReserve = function(tabIndexRightReserve) {
      $scope.toggle.activeTabRightReserve = tabIndexRightReserve;
    };

    // $scope.currentTab = 'one.tpl.html';

    // $scope.onClickTab = function (tab) {
    //     $scope.currentTab = tab.url;
    // }

    // $scope.isActiveTab = function(tabUrl) {
    //     return tabUrl == $scope.currentTab;
    // }

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

    if ($rootScope.channelCode) {
      MainService.trafficStats.get({
        from: $rootScope.channelCode
      });
    }

    /**
     * 某宝宝的收益率
     */
    ProjectService.getYuebaoInterestRatesByDate.get(function(response) {
      if (response.ret === 1) {
        var interestRates = response.data.yuebaoInterestRates;
        $scope.rateLabels = [];
        $scope.yuebaoRate = [];
        $scope.selfRate = [];
        for (var i = 0; i < interestRates.length; i++) {
          var date = new Date(interestRates[i].interestDate);
          $scope.rateLabels.push(date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate());
          $scope.yuebaoRate.push(interestRates[i].yuebaoRate);
          $scope.selfRate.push(interestRates[i].rate);
        }
      }
      if ($scope.rateLabels.length !== 0 && $scope.yuebaoRate.length !== 0 && $scope.selfRate.length !== 0) {
        $scope.lineProjectData = {
          labels: $scope.rateLabels,
          datasets: [{
            label: 'My yuebaoRate dataset',
            fillColor: 'rgba(220,220,220,0.2)',
            strokeColor: 'rgba(220,220,220,1)',
            pointColor: 'rgba(220,220,220,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data: $scope.yuebaoRate
          }, {
            label: 'My selfRate dataset',
            fillColor: 'rgba(151,187,205,0.2)',
            strokeColor: 'rgba(151,187,205,1)',
            pointColor: 'rgba(151,187,205,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(151,187,205,1)',
            data: $scope.selfRate
          }]
        };
        //
      } else {}
    });

    $scope.lineProjectData = {
      labels: [],
      datasets: [{
        label: 'My First dataset',
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: []
      }, {
        label: 'My Second dataset',
        fillColor: 'rgba(151,187,205,0.2)',
        strokeColor: 'rgba(151,187,205,1)',
        pointColor: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,1)',
        data: []
      }]
    };

    $scope.lineProjectOptions = {
      scaleGridLineWidth: 1,
      pointDotRadius: 4,
      datasetFill: true
    };


    $scope.getProjectDetails();
    $scope.getReserveRecords();

    
  });
