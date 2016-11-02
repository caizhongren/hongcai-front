'use strict';
angular.module('hongcaiApp')
  .controller('assignmentsCtrl', function($scope, $rootScope, $stateParams, UserCenterService, $window, toaster, $alert, config ) {

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
    UserCenterService.assignmentsCount.get({}, function(response) {
      if (response && response.ret !== 1) {
        $scope.assignmentsCount = response;
      }
    });

    /**
     * 加载债权
     * @param  page      第几页
     * @param  pageSize  每页数据长度
     * @param  status   状态
     */
    $scope.loadAssignments = function(page, pageSize, status){
      UserCenterService.assignmentsTransferablesList.get({
        page: page,
        pageSize: pageSize
      }, function(response) {
        if (response && response.ret !== -1) {
          $scope.currentPage = page;
          $scope.pageSize = pageSize;
          $scope.searchStatus = status;

          $scope.transferablesList = response.transferables;
          $scope.count = response.count;
          $scope.numberOfPages = Math.ceil($scope.count / pageSize);

          // 测试环境放开限制
          var currentDate = new Date().getTime();
          if(status === 1){
            for (var i = $scope.transferablesList.length - 1; i >= 0; i--) {
              $scope.transferablesList[i].canTransfer = config.isTest || (currentDate - $scope.transferablesList[i].createTime > 10*24*3600*1000);
            }
          }

        } else {
        }
      });
    }
    
    $scope.searchStatus = $stateParams.tab || 1;
    $scope.currentPage = 1;
    $scope.pageSize = 6;
    
    $scope.loadAssignments($scope.currentPage, $scope.pageSize, $scope.searchStatus);
    /**
     * 获取转让中债权列表
     */


    $scope.getTranferingAssignmentsList = function(page, pageSize, Status) {
      $scope.searchStatus = Status =='1,2,5' ? 2 : 3;
      UserCenterService.assignmentsList.get({
        page: page,
        pageSize: pageSize,
        status: Status
      },function(response){
        $scope.assignmentsList = [];
        if (response.data.length>0) {
          
          $scope.page2 = response.index;
          $scope.totalPage = response.totalPage;
          $scope.pageSize2 = response.pageSize;
          $scope.total = response.total;

          $scope.assignmentsList = response.data; 
        }
      });
    }


    /**
     * 撤销债权转让
     */
    $scope.cancelCreditAssignment = function(creditAssignment) {
      UserCenterService.cancelAssignment.update({
        assignmentNumber: creditAssignment.number,
        status: 2
      },function(response){
        if (response && !response.msg) {
          $scope.data = response;
        }else {
          $scope.msg = response.msg;
        }
      });
      $alert({
        scope: $scope,
        template: 'views/modal/cancelCreditAssignment.html',
        show: true
      });  
    };

    $scope.deleteCreditAssignment = function(assignmentNumber){
      UserCenterService.deleteAssignment.update({
        number: assignmentNumber
      },function(response){
        if (response.status ===3) {
          toaster.pop('success', '撤销成功');
          $scope.getTranferingAssignmentsList(1,6,'1,2,5');
        }
      });
    };

    
    $scope.getAssignmentDetail = function(amount,annualEarnings,soldStock,transferedIncome){
      $scope.amount = amount;
      $scope.annual = annualEarnings;
      $scope.soldStock = soldStock;
      $scope.transIncome = transferedIncome;
      UserCenterService.getAssignmentsDetail.get({
        number: '341616080411222384680'
      }, function(response){
        if(response) {
          $alert({
            scope: $scope,
            template: 'views/modal/modal-transferDetail.html',
            show: true
          });
          $scope.datas = response;
        }
      });
    }

  });
