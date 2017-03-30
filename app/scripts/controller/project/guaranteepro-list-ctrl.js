'use strict';
angular.module('hongcaiApp')
  .controller('GuaranteeproListCtrl', function($scope, $stateParams, $rootScope, $location, $state, ProjectService, CreditService, toaster, ProjectUtils, DateUtils, projectStatusMap) {
    
    $scope.sortType = $stateParams.sortType || false;
    $scope.showFlag = $stateParams.showFlag || 0;
    $scope.projectStatusMap = projectStatusMap;
    $scope.pageSize = 6;

    if ($scope.sortType === 'true') {
      $scope.sortType = true;
    } else {
      $scope.sortType = false;
    }
    $scope.toggleSort = function() {
      $scope.sortType = !$scope.sortType;
    };

    function isEmptyObject(obj) {
      var name;
      for (name in obj) {
        return false;
      }
      return true;
    }

    $scope.type = $stateParams.type ? $stateParams.type : '5';
    if (!$stateParams.cycle) {
      $location.path('/guaranteepro-list/6,7,8,9,10,11,12/0_100/0_100/0_1000/release_start_time/false/' + $scope.type);
      return;
    }


    if($scope.type == '5'){
      $rootScope.pageTitle = '宏财精选 - 要理财，上宏财!';
      $scope.typeName = '宏财精选';
      $scope.searchCycle = [
        { value: '0_100', name: '全部' },
        { value: '0_1', name: '30天以下'},
        { value: '1_3', name: '31 - 90天'},
        { value: '3_6', name: '91 - 180天'}
      ];

      $scope.searchAnnualEarings = [
        { value: '0_100', name: '全部' },
        { value: '0_7', name: '7%以下'},
        { value: '7_9', name: '7 - 9%'},
        { value: '9_100', name: '9%以上'}
      ];

      $scope.searchTotals = [
        { value: '0_1000', name: '全部' },
        { value: '0_20', name: '20万以下'},
        { value: '20_50', name: '20 - 50万'},
        { value: '50_100', name: '50 - 100万'},
        { value: '100_1000', name: '100万以上'}
      ];
          
    } else {
      $rootScope.pageTitle = '宏财尊贵 - 要理财，上宏财!';
      $scope.typeName = '宏财尊贵';
      $scope.searchCycle = [
        { value: '0_100', name: '全部' },
        { value: '6_9', name: '6 - 9个月'},
        { value: '9_12', name: '9 - 12个月'},
        { value: '12_100', name: '12个月以上'}
      ];

      $scope.searchAnnualEarings = [
        { value: '0_100', name: '全部' },
        { value: '0_9', name: '9%以下'},
        { value: '9_11', name: '9 - 11%'},
        { value: '11_100', name: '11%以上'}
      ];

      $scope.searchTotals = [
        { value: '0_1000', name: '全部' },
        { value: '0_20', name: '20万以下'},
        { value: '20_50', name: '20 - 50万'},
        { value: '50_100', name: '50 - 100万'},
        { value: '100_1000', name: '100万以上'}
      ];
    }

    $scope.sortCondition = $stateParams.sortCondition;
    $scope.status = $stateParams.status;
    $scope.cycle = $stateParams.cycle;
    $scope.earning = $stateParams.earning;
    $scope.total = $stateParams.total;



    /**
     * 宏财精选、尊贵列表
     */
    $scope.getProjectList = function(page, pageSize) {
      $scope.currentPage = page;
      $scope.showFlag = 1;
      ProjectService.projectList.get({
        status: $stateParams.status,
        cycle: $stateParams.cycle,
        earning: $stateParams.earning,
        total: $stateParams.total,
        sortCondition: $stateParams.sortCondition,
        sortType: $scope.sortType,
        type: $scope.type,
        page: page,
        pageSize: pageSize
      }, function(response) {
        if (response.ret !== 1) {
          $scope.data = [];
          toaster.pop('warning', '服务器正在努力的加载....请稍等。');
          return;
        }
        $scope.serverTime = response.data.serverTime;
        $scope.projectList = response.data.projectList;
        $scope.baseFileUrl = response.data.baseFileUrl;
        $scope.repaymentTypeMap = response.data.repaymentTypeMap;
        $scope.pageCount = response.data.pageCount;
        $scope.orderProp = 'id';
        $scope.data = [];
        $scope.numberOfPages = function() {
          return $scope.pageCount;
        }
        for (var i = 0; i < $scope.projectList.length; i++) {
          $scope.projectList[i].progress = ($scope.projectList[i].total - $scope.projectList[i].amount) / $scope.projectList[i].total * 100;
          $scope.projectList[i].showByStatus = $scope.projectList[i].status === 6 || $scope.projectList[i].status === 7 ? true : false;
          ProjectUtils.projectTimedown($scope.projectList[i],$scope.serverTime);
          $scope.data.push($scope.projectList[i]);
        }
      });
    };


    $scope.page = function(page) {
      if ($scope.currentPage !== page) {
        $scope.getProjectList(page, $scope.pageSize);
      }
    }
    $scope.getProjectList(1, $scope.pageSize);
  })

.directive('projectPagination', function() {
  return {
    restrict: 'AE',
    templateUrl: 'views/partials/_pagination.html'
  };
});
