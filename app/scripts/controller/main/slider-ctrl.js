'use strict';
hongcaiApp.controller('SliderCtrl', ['$scope', '$stateParams', '$rootScope', '$location', '$http', 'analytics', function ($scope, $stateParams, $rootScope, $location, $http, analytics) {
    $rootScope.selectPage = $location.path().split('/')[1];
    $scope.media = [
      {mimeType: 'image/jpg', src:'images/banner-6.jpg', href:'/banner-P2B' },
      {mimeType: 'image/jpg', src:'images/banner-3.jpg', href:'/banner-nine'},
      {mimeType: 'image/jpg', src:'images/banner-4.jpg', href:'/project-activity-group' },
      {mimeType: 'image/jpg', src:'images/banner-5.jpg', href:'banner-partner' }
    ];
    $scope.slickConfig = {
      dots: true,
      autoplay: true,
      autoplaySpeed: 6000,
      onAfterChange: function(slick, index) {
          var slides = $('.slick-track').children().not('.slick-cloned');
          if (index >= slides.length) return;
      }
    };
    $scope.slickHandle = {
    };
}]);


