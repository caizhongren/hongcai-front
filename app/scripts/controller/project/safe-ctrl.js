'use strict';
hongcaiApp.controller('SafeCtrl', ['$scope', '$state', '$rootScope', '$location', '$stateParams', function ($scope, $state, $rootScope, $location, $stateParams) {
       
  $rootScope.selectPage = $location.path().split('/')[1];

  $scope.hsh = $location.hash();

  $scope.addActive = function($event){
    angular.element($event.target).closest('.col-xs-12').find('.active').removeClass('active');
    angular.element($event.target).closest('li').find('a').addClass('active');
  }

}]);
