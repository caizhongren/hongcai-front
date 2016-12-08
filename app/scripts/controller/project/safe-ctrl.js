'use strict';
angular.module('hongcaiApp')
  .controller('SafeCtrl', function($anchorScroll, $scope, $state, $rootScope, $location) {
	$rootScope.pageTitle = '安全保障' + ' - 要理财，上宏财!';
    $rootScope.selectPage = $location.path().split('/')[1];

    $scope.hsh = $location.hash();

    $scope.addActive = function($event) {
      angular.element($event.target).closest('.col-xs-12').find('.active').removeClass('active');
      angular.element($event.target).closest('li').find('a').addClass('active');
    };

    //banner的tab切换
    $(".banner-tit").click(function(){
		var index = $(this).index('.banner-tit');
		$(".banner-info").hide();
		$('.banner-info').eq(index).slideDown(500);
		$('.banner-tit').removeClass('banner-click1 banner-click2 banner-click3 banner-click4');
		$(this).addClass("banner-click"+(index+1));
	});
	//关闭banner抽屉
	$(".wrapB b").click(function(){
		$(this).parent().parent().slideUp();
		$('.banner-tit').removeClass('banner-click1 banner-click2 banner-click3 banner-click4');
	});

	$scope.demo = function (arg) {
	    $location.hash(arg);
	    $anchorScroll();
	};

	//资金安全点击按钮切换

	$('#fund-slide p').click(function(){
		var index = $(this).index('#fund-slide p');
		$('#fund-slide p').removeClass('active-tab');
		$(this).addClass('active-tab');
		$('.tab').hide();
		$(".fund-slide-content .info").css({opacity:0}).hide();
		$(".info").eq(index).show().animate({opacity:1,  width:"100%"}, 1000,function(){
			$(".fund-slide-content .info .descrip").css({height: 0,width: '30%', opacity:0})
			$(".fund-slide-content .info .descrip").eq(index).animate(({height: "100%",opacity:1}),500);
			$(".info").eq(index).find(".tab").show();
			if(index == 0 ) {
				$('.info,.info1 img').css({width:'90%',height:'90%'}).animate({
				   width: "100%",
				   height: "100%"
				  }, 800 );
				};
			if(index == 2 ) {
					$('.info3 .line').addClass('highlight-line');
				};
			});	
		});

	//资金安全左右切换

	// $(".pre").click(function(){
	// 		var index = $(this).index(".pre");
	// 			$(".fund-slide-content .info").css({opacity:0, height: 0});
	// 			$(".info").eq(index-1).show().animate({opacity:1, height:"100%"}, 500,function(){
	// 				$(".fund-slide-content .info .descrip").eq(index-1).css({width: 0,opacity:0}).animate(({width: "30%",opacity:1}),800);
	// 				$(".info").eq(index-1).find(".tab").show();
	// 				if(index == 0 ) {
	// 					$('.info,.info .descrip').css
	// 					$('.info,.info1 img').css({width:'90%',height:'90%'}).animate({
	// 				    width: "100%",
	// 				    height: "100%"
	// 				  }, 800 );
	// 				}

	// 			});
	// 		$("#fund-slide p").removeClass("active-tab");
	// 		$("#fund-slide p").eq(index-1).addClass("active-tab");	
	// 	})
	// 	$(".nxt").click(function() {
	// 		var index = $(this).index(".nxt");
	// 			$(".fund-slide-content .info").css({opacity:0,height: 0});
	// 			$(".info").eq(index + 1).show().animate({opacity:1, height:"100%"}, 500,function(){
	// 				$(".fund-slide-content .info .descrip").eq(index + 1).css({width: 0,opacity:0}).animate(({width: "30%",opacity:1}),800);
	// 				$(".info").eq(index + 1).find(".tab").show();
	// 				if(index == 0 ) {
	// 					$('.info,.info .descrip').css
	// 					$('.info,.info1 img').css({width:'90%',height:'90%'}).animate({
	// 				    width: "100%",
	// 				    height: "100%"
	// 				  }, 800 );
	// 				}

	// 			});
	// 			$("#fund-slide p").removeClass("active-tab");
	// 			$("#fund-slide p").eq(index+1).addClass("active-tab");
				
	// 	});



  });
