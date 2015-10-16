'use strict';
angular.module('hongcaiApp')
  .controller('SliderCtrl', ['$scope', '$stateParams', '$rootScope', '$location', function($scope, $stateParams, $rootScope, $location) {
    $rootScope.selectPage = $location.path().split('/')[1];
    $scope.media = [{
      mimeType: 'image/jpg',
      src: 'images/banner/banner001.png',
      href: '/consultant-team'
    },{
      mimeType: 'image/jpg',
      src: 'images/banner/banner002.png',
      href: '/banner-investmentplan'
    },{
      mimeType: 'image/jpg',
      src: 'images/banner/banner003.png',
      href: '/banner-nine'
    }, {
      mimeType: 'image/jpg',
      src: 'images/banner/banner004.png',
      href: 'banner-partner'
    },{
      mimeType: 'image/jpg',
      src: 'images/banner/banner005.png',
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
