'use strict';
hongcaiApp.controller('SliderCtrl', ['$scope', '$stateParams', '$rootScope', '$location', function ($scope, $stateParams, $rootScope, $location) {
    $rootScope.selectPage = $location.path().split('/')[1];
    $scope.media = [
      {mimeType: 'image/png', src:'images/banner-6.png', href:'/banner-P2B' },
      {mimeType: 'image/png', src:'images/banner-3.png', href:'/banner-nine'},
      {mimeType: 'image/png', src:'images/banner-4.png', href:'/project-activity-group' },
      {mimeType: 'image/png', src:'images/banner-5.png', href:'banner-partner' }
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


