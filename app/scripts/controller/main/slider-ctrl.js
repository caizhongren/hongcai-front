'use strict';
angular.module('hongcaiApp')
  .controller('SliderCtrl', function($scope, $stateParams, $rootScope, $location, MainService) {
    $rootScope.selectPage = $location.path().split('/')[1];

    //http://www.hongcai.com/hongcai-trends?page=0&perPage=5

    $scope.media = [{
      mimeType: 'image/png',
      src: 'images/banner-new/banner06.jpg',
      href: '/#!/activity/send-money',
      name: '投资送加息券'
    },{
      mimeType: 'image/png',
      src: 'images/banner/banner-11.png',
      href: '/#!/register',
      name: '注册拿8888元'
    },{
      mimeType: 'image/png',
      src: 'images/banner-new/banner01.png',
      name: '国有企业入驻宏财网'
    }, {
      mimeType: 'image/png',
      src: 'images/banner-new/banner05.png',
      href: 'http://www.hongcai.com/#!/us/hongcai-trends/491',
      name: '新三板金控第一股严选项目'
    }]

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
  });
