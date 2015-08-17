'use strict';
angular.module('hongcaiApp')
  .controller('SliderCtrl', ['$scope', '$stateParams', '$rootScope', '$location', function($scope, $stateParams, $rootScope, $location) {
    $rootScope.selectPage = $location.path().split('/')[1];
    $scope.media = [{
      mimeType: 'image/jpg',
      src: 'images/banner/banner-8.jpg',
      href: '/consultant-team'
    },{
      mimeType: 'image/jpg',
      src: 'images/banner/banner-7.png',
      href: '/banner-investmentplan'
    },{
      mimeType: 'image/jpg',
      src: 'images/banner/banner-3.jpg',
      href: '/banner-nine'
    }, {
      mimeType: 'image/jpg',
      src: 'images/banner/banner-5.jpg',
      href: 'banner-partner'
    }];
    $scope.slickConfig = {
      dots: true,
      autoplay: true,
      autoplaySpeed: 6000,
      onAfterChange: function(slick, index) {
        var slides = $('.slick-track').children().not('.slick-cloned');
        if (index >= slides.length) {
          return;
        }
      }
    };
    $scope.slickHandle = {};
  }]);
