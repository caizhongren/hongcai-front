'use strict';
angular.module('hongcaiApp')
  .controller('UserDealCtrl', function ($scope, $rootScope, toaster, UserCenterService) {
    $rootScope.selectSide = 'record';
    $scope.type = 0;
    $scope.dateInterval = 0;
    $scope.dealType = 0;

    $scope.recordSelect = function() {
      var getDealByUser = UserCenterService.getDealByUser.get({ 
        dateInterval: $scope.dateInterval,
        dealType: $scope.dealType
      },function(response) {
        if (getDealByUser.ret === 1) {
          $scope.dealList = getDealByUser.data.dealList;
          $scope.type = getDealByUser.data.type;
          $scope.dateInterval = getDealByUser.data.dateInterval;
          $scope.userId = getDealByUser.data.userId;
          $scope.capital = getDealByUser.data.capital;
          $scope.dealTypes = getDealByUser.data.dealTypes;
          $scope.currentPage = 0;
          $scope.pageSize = 10;
          $scope.data = [];

          $scope.numberOfPages = function() {
            return Math.ceil($scope.data.length / $scope.pageSize);
          };

          for (var i = 0; i < $scope.dealList.length; i++) {
            $scope.data.push($scope.dealList[i]);
          }
          //按交易类型筛选
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

    $scope.recordSelect();



    /*$scope.selectedIcon = 'Heart';
    $scope.selectedIcons = '["Gear"]';
    $scope.icons = '[{"value":"Gear","label":"<i class=\"fa fa-gear\"></i> Gear"},{"value":"Globe","label":"<i class=\"fa fa-globe\"></i> Globe"},{"value":"Heart","label":"<i class=\"fa fa-heart\"></i> Heart"},{"value":"Camera","label":"<i class=\"fa fa-camera\"></i> Camera"}]';*/
  });

