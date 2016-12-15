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
    var position2 = 100;
    var position3 = 200;
    function carousel(){
      $('.development-course .part2').show().animate({left: position2+'%'}, 800,function(){})
      $('.development-course .part1').show().animate({left: position1+'%'}, 800,function(){})
      $('.development-course .part3').show().animate({left: position3+'%'}, 800,function(){})
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
      position1-=100;
      position2-=100;
      position3-=100;
      carousel();
    });
    $('.development-course .prev').on('click', function(){
      position1+=100;
      position2+=100;
      position3+=100;
      carousel();
    });

    //产品特点放大效果
    $('.product-content').children().hover(
      function(){
        if($(this).attr('class')=='hongjinbao'){
          $(this).stop().animate({width: 398, height: 485, left: '6%', top: '-30px'},500);
        }else {
          $(this).stop().animate({width: 398, height: 485, right: '6%', top: '-30px'},500);
        }
        $(this).children('.title').stop().animate({'font-size': 28},500);
        $(this).children('.contain>p').stop().animate({'margin-bottom': 26},500);
        $(this).children('.contain').stop().animate({'font-size': 18},500);
        
      },function(){
        if($(this).attr('class')=='hongjinbao'){
          $(this).stop().animate({width: 298, height: 385, left: '10%', top: 0},500);
        }else {
          $(this).stop().animate({width: 298, height: 385, right: '10%', top: 0},500);
        }
        $(this).children('.title').stop().animate({'font-size': 24},500);
        $(this).children('.contain').stop().animate({'font-size': 14},500);
        $(this).children('.contain>p').stop().animate({'margin-bottom': 16},500);
      }
    );
  

    //高管团队悬浮效果
    $('.poster-item').hover(
      function(){
        $(this).children('.hoverShow').stop().animate({backgroundColor: 'rgba(0,0,0,0.8)',top: 0},300);
      },
      function() {
        $(this).children('.hoverShow').stop().animate({backgroundColor: 'rgba(0,0,0,0.2)',top: '326px'},300);
      }
    );

    //如何投资 圆圈背景变色
    
    $('#carousel-example-generic, .carousel-control img').click(function(){
      // console.log($('#carousel-example-generic').find('.active').indexOf());
      console.log($('#carousel-example-generic').find('.active').index());
      if($('#carousel-example-generic').find('.active').index() == 0 || $('#carousel-example-generic').find('.active').index() == 11) {
        $('.process-circle').find('.li1').addClass('li_activ').siblings().removeClass('li_activ');
      } else if($('#carousel-example-generic').find('.active').index() >= 1 && $('#carousel-example-generic').find('.active').index() < 5 ) {
        $('.process-circle').find('.li2').addClass('li_activ').siblings().removeClass('li_activ');
      } else if($('#carousel-example-generic').find('.active').index() >= 5 && $('#carousel-example-generic').find('.active').index() < 8 ) {
        $('.process-circle').find('.li3').addClass('li_activ').siblings().removeClass('li_activ');
      } else {
        $('.process-circle').find('.li4').addClass('li_activ').siblings().removeClass('li_activ');
      }
    })

  }]);
