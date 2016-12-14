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
    
    //发展历程
    $('.development-course .part .time').on('mouseover', function(){  
        $(this).css('color','#ff6100');  
        $(this).parent().find('.contain').css('color','#ff6100');
    }).on('mouseleave', function(){  
        $(this).css('color','#666');  
        $(this).parent().find('.contain').css('color','#666');
    });
    var position1 = 0;
    var position2 = 980;
    var position3 = 1960;
    function carousel(){
      $('.development-course .part2').show().animate({left: position2}, 800,function(){})
      $('.development-course .part1').show().animate({left: position1}, 800,function(){})
      $('.development-course .part3').show().animate({left: position3}, 800,function(){})
      if (position1 == 0) {
        $('.development-course .prev').hide();
      }else {
        $('.development-course .prev').show();
      }
      if (position3 == 0) {
        $('.development-course .next').hide();
      }else {
        $('.development-course .next').show();
      }
    } 
    $('.development-course .next').on('click', function(){
      position1-=980;
      position2-=980;
      position3-=980;
      carousel();
    });
    $('.development-course .prev').on('click', function(){
      position1+=980;
      position2+=980;
      position3+=980;
      carousel();
    });





  }]);
