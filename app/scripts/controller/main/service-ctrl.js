hongcaiApp.controller("ServiceCtrl", ["$scope", "$state", "$rootScope", "$stateParams", function ($scope, $state, $rootScope, $stateParams) {
    
    $(window).scroll(function(){
        if ($(window).scrollTop()>100){
            $(".toTop").fadeIn(500);
        }else{
            $(".toTop").fadeOut(500);
        }
    });

    $(".toTop").click(function(){
        $('body,html').animate({scrollTop:0},800);
        return false;
    });

}]);