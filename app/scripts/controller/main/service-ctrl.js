'use strict';
hongcaiApp.controller('ServiceCtrl', ['$scope', '$state', '$rootScope', '$stateParams', function ($scope, $state, $rootScope, $stateParams) {

    var $bottomTools = $('.bottom_tools');
    var $qrTools = $('.qr_tool');
    var qrImg = $('.qr_img');

    $(window).scroll(function () {
        var scrollHeight = $(document).height();
        var scrollTop = $(window).scrollTop();
        var $windowHeight = $(window).innerHeight();
        scrollTop > 50 ? $('#scrollUp').fadeIn(200).css('display','block') : $('#scrollUp').fadeOut(200);
        $bottomTools.css('bottom', scrollHeight - scrollTop > $windowHeight ? 130 : $windowHeight + scrollTop + 130 - scrollHeight);
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
    // $scope.inputValue = 0;
    $scope.params = {
        'inputValue' : '',
        'displayValue' : '100-100万',
        'rate' : '',
        'displayrate' : 'XX%',
        'selectedIcon' : '',
        'icons' : [
            {value: '3个月', label: '3个月'},
            {value: '6个月', label: '6个月'},
            {value: '12个月', label: '12个月'}
        ],
        'interest' : '',
        'payback' : ''
    };

    $scope.isResultShow = false;
    $scope.arrow = $scope.isResultShow ? '>>' : '<<';

   	$scope.calculate = function() {
   		// popover.saved=true;
        $scope.targetSelectedIcon = $scope.params.selectedIcon.replace(/个月/g,'');
        if($scope.params.displayValue &&  $scope.params.rate && $scope.params.selectedIcon){
            $scope.params.interest = $scope.params.inputValue * $scope.params.rate/1200 * $scope.targetSelectedIcon;
            $scope.params.payback = $scope.params.inputValue + $scope.params.interest;
            $scope.isResultShow = $scope.isResultShow ? false : true;
            $scope.arrow = '>>';
            if($scope.isResultShow){
                angular.element('#calculater .slide').animate({width:'show'},300);
            }
        }

   	}

    $scope.colorCtrl = function(){
        $('#calculater .btn-default').css({'color':'#777'});
        console.log($('#calculater .btn-default').length)
    }

    $scope.capitalValueChange = function() {
        $scope.params.displayValue = $scope.params.inputValue === '' || $scope.params.inputValue < 100 || $scope.params.inputValue > 1000000 ? '100-100万' : $scope.params.inputValue;
    };

    $scope.rateValueChange = function() {
        $scope.params.displayrate = $scope.params.rate === '' || $scope.params.rate === null || $scope.params.rate == undefined ? 'XX%' : $scope.params.rate + '%';
    };


    $scope.switchResult = function() {
        $scope.isResultShow = $scope.isResultShow ? false : true;
        $scope.arrow = $scope.isResultShow ? '>>' : '<<';
        if($scope.isResultShow){
            angular.element('#calculater .slide').animate({width:'show'},300);
        }else {
            angular.element('#calculater .slide').animate({width:'hide'},300);
        }

    };

    $scope.changeArrow = function() {
        if($scope.isResultShow == true){
            $scope.isResultShow = false;
            $scope.arrow = '<<';
            $scope.params.interest = '';
            $scope.params.payback = '';
            $scope.params.displayValue = '100-100万';
            $scope.params.displayrate = 'XX%'
            $scope.params.inputValue = '';
            $scope.params.rate = '';
            $scope.params.selectedIcon = '';
        }
    }


}]);
