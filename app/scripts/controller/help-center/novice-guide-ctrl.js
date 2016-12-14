'use strict';
angular.module('hongcaiApp')
  .controller('NoviceGuideCtrl', ['$scope', '$state', '$rootScope', '$location', function($scope, $state, $rootScope, $location) {
    $rootScope.isNoviceGuide = true;

    //宏财简介打字效果
    var txt = "宏财网（hongcai.com）2014年上线运营，2016年获得国有金融机构1亿元A轮融资，凭借股东广泛的金融资源、博士团队的专业能力和严谨的风控管理,为广大投资者筛选优质的投资项目。",
    	  count = 0,
        timerID;
    $(window).scroll(function(){
      if($(window).scrollTop() >= 100 && $(window).scrollTop() <1400) {
        clearInterval(timerID);
        timerID = setInterval(function(){
          $("#intr-text").text(txt.substr(0,count++));
          if(count > txt.length) {
            clearInterval(timerID);
            return;
          }
        },40);
      }
    });
    
    //高管团队悬浮效果
    $('.poster-item').hover(
      function(){
        $(this).children('.hoverShow').stop().animate({backgroundColor: 'rgba(0,0,0,0.8)',top: 0},300);
      },
      function() {
        $(this).children('.hoverShow').stop().animate({backgroundColor: 'rgba(0,0,0,0.2)',top: '326px'},300);
      }

    );



  }]);
