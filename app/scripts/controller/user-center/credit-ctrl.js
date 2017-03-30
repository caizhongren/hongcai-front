'use strict';
angular.module('hongcaiApp')
  .controller('CreditCtrl', function($location, $scope, $http, $rootScope, $state, $stateParams, UserCenterService, $aside, $window, OrderService, config, toaster, $alert) {
    $scope.page = 1;
    $scope.pageSize = 5;
    $scope.showOther = false;
    $scope.currentPage = 1;
    /**
     * 判断是否开通第三方托管账户
     */
    $scope.checkTrusteeshipAccount = function() {
      if ( $rootScope.securityStatus.trusteeshipAccountStatus === 1) {
        $scope.haveTrusteeshipAccount = true;
      } else {
        $scope.haveTrusteeshipAccount = false;
      }
      return $scope.haveTrusteeshipAccount;
    }



    /**
     * 第一步
     */
    $scope.creditStepFlag = 1;
    $scope.Math = window.Math;
    $scope.disabledFlag1 = $scope.disabledFlag2 = $scope.disabledFlag3 = false;
    /**
     * 解决ng-click ng-disabled的生效的问题。
     */
    $scope.$watch('creditStepFlag', function() {
      if ($scope.creditStepFlag === 1) {
        $scope.disabledFlag2 = true;
        $scope.disabledFlag3 = true;
      } else if ($scope.creditStepFlag === 2) {
        $scope.disabledFlag3 = true;
      } else {
        $scope.disabledFlag2 = false;
      }
    });

    /**
     * 我的债权统计数据
     */
    UserCenterService.getCreditRightStatistics.get({}, function(response) {
      if (response.ret === 1) {
        $scope.creditRightStatis = response.data.creditRightStatis;
        $scope.showCreditRightStatistics = $scope.creditRightStatis.totalInvestCount;
      } else {
        $scope.showCreditRightStatistics = false;
        // toaster.pop('warning', response.msg);
      }
    });
    

    /**
     * 加载债权
     * @param  page      第几页
     * @param  pageSize  每页数据长度
     * @param  status   状态
     */
    $scope.loadCredits = function(page, pageSize, status,type){
      UserCenterService.getHeldInCreditRightList.get({
        page: page,
        pageSize: pageSize,
        status: status,
        type: type
      }, function(response) {
        if (response.ret === 1) {
          $scope.searchStatus = status;
          $scope.currentPage = page;
          $scope.pageSize = pageSize;

          $scope.heldInCreditList = response.data.heldIdCreditList;
          $scope.creditRightTransferStatusMap = response.data.creditRightTransferStatusMap;
          $scope.creditRightStatusMap = response.data.creditRightStatusMap;
          $scope.productsMap = response.data.productsMap;
          $scope.fundsPoolInOutMap = response.data.fundsPoolInOutMap;
          $scope.count = response.data.count;
          $scope.numberOfPages = Math.ceil($scope.count / pageSize);
        } else {
          toaster.pop('warning', response.msg);
        }
      });

    }
    
    $scope.tabStatus = 7;
    $scope.searchStatus = parseInt($stateParams.searchStatus) || 1;
    $scope.tabToggle = function(tab) {
      $scope.tabStatus = tab;
      $scope.searchStatus = 1;
      $scope.loadCredits($scope.currentPage, $scope.pageSize, $scope.searchStatus, $scope.tabStatus);
    }
    $scope.tabToggle(7);

    /**
     * 自动复投/取消复投
     */
    $scope.autoReinvest = function(reinvestActionType,creditRightId) {
      if ($rootScope.autoTransfer !== 1) {
        $scope.msg = '亲~，开启自动续投功能需要先开通自动投标权限哦!';
        $alert({
          scope: $scope,
          template: 'views/modal/alert-openReservation.html',
          show: true
        });
      } else {
        UserCenterService.autoReinvest.get({
          repeat:reinvestActionType,
          creditRightId:creditRightId
        },function(response){
          if(response.ret === 1) {
            $state.reload();
          } else {
            if (response.code == -1082) {
              $scope.msg = '亲~，开启自动续投功能需要先开通自动投标权限哦!';
              $alert({
                scope: $scope,
                template: 'views/modal/alert-openReservation.html',
                show: true
              });
            } else {
              toaster.pop('warning', response.msg);
            }
          }
        });
      }
    }


    /**
     * 平台C债权转入债权池
     */
    $scope.putCreditRightInPool = function(creditRightId) {
      UserCenterService.putCreditRightInPool.get({
        creditRightId:creditRightId
      },function(response){
        if(response.ret === 1) {
          $state.reload();
        } else {
          toaster.pop('warning', response.msg);
        }
      });
    }



    //饼图设置
    $scope.lineConfig = {
      theme:'default',
      dataLoaded:true
    };

    $scope.lineOption = {
      tooltip : {
          trigger: 'item'
      },
      legend: {
          orient: 'vertical',
          x: 'left',
      },
      title: {
        show: 25,
        text: "在投金额 <br> 10000元",
        textAlign: "middle",
        textBaseline: "middle",
        left: "38%",
        top: "48%",
        textStyle: {
            color: "#666666",
            fontWeight: "normal",
            fontSize: "13"
        }
      },
      series : [
        {
          name:'投资占比',
          type:'pie',
          data:[
            {value:'25', name: '月月宏'},
            {value:'25', name: '宏财精选'},
            {value:'25', name: '宏财尊贵'},
            {value:'25', name: '债权转让'},
            {value:'25', name: '其他'}
          ],
          radius: ["60%", "85%"],
          avoidLabelOverlap: false,
          clockwise: !1,
          labelLine: {
            normal: {
              show: !1
            }
          },
          label: {
            normal: {
              show: !1,
               position: 'center'
            },
            emphasis: {
              show: 25,
              textStyle: {
                fontSize: '13',
                fontWeight: 'normal'
              }
            }
          },
        }
      ],
      color : [ '#0460cd', '#2b8bf1', '#ffc435', '#ffaa25', '#f9721f']
    }


  });
