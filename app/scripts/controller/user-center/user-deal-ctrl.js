/**
 * 用户交易记录页
 */
'use strict';
angular.module('hongcaiApp')
  .controller('UserDealCtrl', function ($scope, $rootScope, toaster, UserCenterService) {
    $scope.type = 0;
    $scope.dateInterval = 0;
    $scope.dealType = 0;
    $scope.currentPage = 1;
    $scope.pageSize = 10;

    $scope.dealTypeList = [
      {
        'type': '全部',
        'no': ''
      },{
        'type': '回款',  //包含：项目正常回款、债权转让回款
        'no': '4,16'
      },{
        'type': '投资',
        'no': '3'
      },{
        'type': '充值',
        'no': '1'
      },{
        'type': '提现',  
        'no': '2'
      },{
        'type': '奖励',  //包含：奖金、代理人绩效
        'no': '18,20'
      },{
        'type': '其他',  //包含：提现手续费、债权转让手续费
        'no': '8,15'
      }
    ]
    $scope.selected = '全部';
    //选择资金流水类型
    $scope.selectDealType = function(dealType){
      $scope.selected = dealType.type;
      $scope.dealType = dealType.no;
    }

    $scope.$watch('startTime', function(newVal, oldVal) {
      if (newVal) {
        alert(11);
      }
      
    })

    function start() {
      laydate({
        choose: function(datas){
          $scope.getDeals(1);
          start.max = datas; //结束日选好后，重置开始日的最大日期
        }
      })
    }
    $scope.end = function() {
     laydate({
        choose: function(datas){
          $scope.getDeals(1);
          start.max = datas; //结束日选好后，重置开始日的最大日期
        }
      })
    }

    $scope.getDeals = function(page) {
      $scope.currentPage = page;
      var getDealByUser = UserCenterService.getDealByUser.get({ 
        dateInterval: $scope.dateInterval,
        dealType: $scope.dealType,
        page: page
      },function(response) {
        if (getDealByUser.ret === 1) {
          $scope.dealList = getDealByUser.data.dealList;
          $scope.type = getDealByUser.data.type;
          $scope.dateInterval = getDealByUser.data.dateInterval;
          $scope.userId = getDealByUser.data.userId;
          $scope.capital = getDealByUser.data.capital;
          $scope.dealTypes = getDealByUser.data.dealTypes;
          $scope.count = getDealByUser.data.count;
          $scope.data = [];
          $scope.totalPage = Math.ceil(getDealByUser.data.count / $scope.pageSize);

          for (var i = 0; i < $scope.dealList.length; i++) {
            $scope.data.push($scope.dealList[i]);
          }
          $scope.icons = [];
          for (var j in $scope.dealTypes) {
            var obj = {};
            obj.value = '' + j + '';
            obj.label = '' + $scope.dealTypes[j] + '';
            $scope.icons.push(obj);
          }

        } else {
          toaster.pop('warning',response.msg);
        }
      });
    };

    $scope.getDeals(1);

  

  });

