hongcaiApp.controller("ServiceCtrl", ["$scope", "$state", "$rootScope", "$stateParams", function ($scope, $state, $rootScope, $stateParams) {
    
    var $bottomTools = $('.bottom_tools');
    var $qrTools = $('.qr_tool');
    var qrImg = $('.qr_img');
    
    $(window).scroll(function () {
        var scrollHeight = $(document).height();
        var scrollTop = $(window).scrollTop();
        var $windowHeight = $(window).innerHeight();
        scrollTop > 50 ? $("#scrollUp").fadeIn(200).css("display","block") : $("#scrollUp").fadeOut(200);           
        $bottomTools.css("bottom", scrollHeight - scrollTop > $windowHeight ? 40 : $windowHeight + scrollTop + 40 - scrollHeight);
    });
    
    $('#scrollUp').click(function (e) {
        e.preventDefault();
        $('html,body').animate({ scrollTop:0});
    });
    
    $qrTools.hover(function () {
        qrImg.fadeIn();
    }, function(){
         qrImg.fadeOut();
    });

    //计算器
    $scope.value = '';
    $scope.displayValue = $scope.value;
    $scope.rate = '';

    $scope.selectedIcon = '';
    $scope.icons = [
        {value: '3期', label: '<i class="fa"></i>3期'},
        {value: '6期', label: '<i class="fa"></i>6期'},
        {value: '12期', label: '<i class="fa"></i>12期'}
    ];


   	function calculate (){
   		popover.saved=true;
   		console.log(99)
   	}

    $scope.valueChange = function(){
        $scope.displayValue =  ($scope.value === '' || $scope.value < 100 || $scope.value > 1000000) ? 0 : $scope.value
    };

    $scope.switchResult = function(){
        $scope.isResultShow = $scope.isResultShow ? false : true;
    };


    $(".handle").click(function(){
        if(!$(this).siblings(".slide").is(":visible")){
            $(this).addClass("select");
            $(this).siblings(".slide").animate({width:"show"},300);
            $('.rotate').html('&gt;&gt;');
        }
        else{
            $(this).siblings(".slide").animate({width:"hide"},300);
            $(this).removeClass("select");
            $('.rotate').html('&lt;&lt;');
        }
    })

    $('.btn-primary').click(function(){
        //$('#rateValue').text({{value}}*{{rate}});
    })

}]);