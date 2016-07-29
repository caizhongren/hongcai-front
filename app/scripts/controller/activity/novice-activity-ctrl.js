/*
 * @Author: yuyang
 * @Date:   2016-07-28 14:32:02
 * @Last Modified by:  
 * @Last Modified time: 
 */

'use strict';
angular.module('hongcaiApp')
  .controller('NoviceActivityCtrl', function($scope, ProjectService) {
	
	/* 新手标*/
    ProjectService.newbieBiaoProject.get({}, function(response) {
      if (response.ret === -1) {
        return;
      }
	  $scope.newbieBiaoProject = response;
	  $scope.newbieBiaoProject.soldStock = response.soldStock;
	  $scope.newbieBiaoProject.occupancyStock = response.occupancyStock;
	  $scope.newbieBiaoProject.countInvest = response.countInvest;
	  $scope.progress = ($scope.newbieBiaoProject.soldStock + $scope.newbieBiaoProject.occupancyStock) * 100 / $scope.newbieBiaoProject.countInvest;
	})
  });
