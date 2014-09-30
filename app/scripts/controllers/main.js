'use strict';

/**
 * @ngdoc function
 * @name p2pSiteWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the p2pSiteWebApp
 */
angular.module('p2pSiteWebApp')
  .controller('MainCtrl', ['$scope', '$resource', function ($scope, $resource) {
      // $scope.projectList = Restangular.all('siteProject/getProjectList?sortType=false');
      // $scope.projectList = Restangular.one('siteProject').all('getProjectList').getList({ sortType: false});
      var ProjectList = $resource('/hongcai/api/v1/siteProject/getProjectList?sortType=false');
      ProjectList.get({}, function (projectList) {
        $scope.projectList = projectList.data.projectList;
      })
      console.log($scope.projectList);
    }]);
