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
    $scope.value = 0;

    $scope.selectedIcon = "";
    // $scope.selectedIcons = '["Globe","Heart"]';
    // $scope.icons = '[{"value":"Gear","label":"<i class=\"fa fa-gear\"></i> Gear"},{"value":"Globe","label":"<i class=\"fa fa-globe\"></i> Globe"}]';

}]);