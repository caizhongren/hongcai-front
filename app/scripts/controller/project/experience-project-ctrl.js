'use strict';
angular.module('hongcaiApp')
  .controller('ExperienceProjectCtrl', function($scope, $state, $rootScope, $location, ProjectService, $alert, toaster) {

    $scope.getExperienceProjectDetails = function() {
      var projectDetails = ProjectService.getExperienceProjectDetail.get({}, function() {
        if (projectDetails.ret === 1) {
          $scope.project = projectDetails.data.project;
          $scope.investCount = projectDetails.data.investCount;
        } else {
          toaster.pop('warning', projectDetails.msg);
        }
      });
    };

    $scope.getExperienceProjectDetails();
  });
