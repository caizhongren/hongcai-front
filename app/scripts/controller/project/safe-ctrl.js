'use strict';
angular.module('hongcaiApp')
  .controller('SafeCtrl', ['$scope', '$state', '$rootScope', '$location', function($scope, $state, $rootScope, $location) {

    $rootScope.selectPage = $location.path().split('/')[1];

    $scope.hsh = $location.hash();

    $scope.addActive = function($event) {
      angular.element($event.target).closest('.col-xs-12').find('.active').removeClass('active');
      angular.element($event.target).closest('li').find('a').addClass('active');
    };

  }]);
