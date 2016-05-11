'use strict';
angular.module('hongcaiApp')
  .controller('NoviceGuideCtrl', ['$scope', '$state', '$rootScope', '$location', function($scope, $state, $rootScope, $location) {
    $rootScope.isNoviceGuide = true;
  }]);
