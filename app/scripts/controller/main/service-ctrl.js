'use strict';
angular.module('hongcaiApp')
  .controller('ServiceCtrl', ['$scope', function($scope) {
    var $bottomTools = $('.bottom_tools');
    var $feedback = $('#feedback');

    $(window).scroll(function() {
      var scrollHeight = $(document).height();
      var scrollTop = $(window).scrollTop();
      var $windowHeight = $(window).innerHeight();
      if (scrollTop > 50) {
        $('#scrollUp').fadeIn(200).css('display', 'block');
      } else {
        $('#scrollUp').fadeOut(200);
      }
      $bottomTools.css('bottom', scrollHeight - scrollTop > $windowHeight ? 130 : $windowHeight + scrollTop + 130 - scrollHeight);
    });

    $('#scrollUp').click(function(e) {
      e.preventDefault();
      $('html,body').animate({
        scrollTop: 0
      });
    });


    $scope.params = {
      'inputValue': '',
      'displayValue': '100-100万',
      'rate': '',
      'displayrate': 'XX%',
      'selectedIcon': '',
      'icons': [{
        allottedTime: '3个月'
      }, {
        allottedTime: '6个月'
      }, {
        allottedTime: '12个月'
      }],
      'interest': '',
      'payback': ''
    };

    $scope.isResultShow = false;
    $scope.arrow = $scope.isResultShow ? '>>' : '<<';

    $scope.calculate = function() {
      // popover.saved=true;
      // $scope.targetSelectedIcon = $scope.params.selectedIcon.allottedTime.replace(/个月/g, '');
      $scope.targetSelectedIcon = $scope.params.selectedIcon;
      if ($scope.params.displayValue && $scope.params.rate && $scope.params.selectedIcon) {
        $scope.params.interest = Math.round($scope.params.inputValue * $scope.params.rate * $scope.targetSelectedIcon / 36500 * 100) / 100;
        $scope.params.payback = parseInt($scope.params.inputValue) +$scope.params.interest;
        $scope.isResultShow = $scope.isResultShow ? false : true;
        $scope.arrow = '>>';
        if ($scope.isResultShow) {
          angular.element('#calculater .slide').animate({
            width: 'show'
          }, 300);
        }
      }

    };

    $scope.colorCtrl = function() {
      $('#calculater .btn-default').css({
        'color': '#777'
      });
      //console.log($('#calculater .btn-default').length);
    };

    $scope.capitalValueChange = function() {
      $scope.params.displayValue = $scope.params.inputValue === '' || $scope.params.inputValue < 100 || $scope.params.inputValue > 1000000 ? '100-100万' : $scope.params.inputValue;
    };

    $scope.rateValueChange = function() {
      $scope.params.displayRate = $scope.params.rate === '' || $scope.params.rate === null || $scope.params.rate === undefined ? 'XX%' : $scope.params.rate + '%';
    };

    $scope.switchResult = function() {
      $scope.isResultShow = $scope.isResultShow ? false : true;
      $scope.arrow = $scope.isResultShow ? '>>' : '<<';
      if ($scope.isResultShow) {
        angular.element('#calculater .slide').animate({
          width: 'show'
        }, 300);
      } else {
        angular.element('#calculater .slide').animate({
          width: 'hide'
        }, 300);
      }

    };

    $scope.changeArrow = function() {
      if ($scope.isResultShow === true) {
        $scope.isResultShow = false;
        $scope.arrow = '<<';
        $scope.params.interest = '';
        $scope.params.payback = '';
        $scope.params.displayValue = '100-100万';
        $scope.params.displayrate = 'XX%';
        $scope.params.inputValue = '';
        $scope.params.rate = '';
        $scope.params.selectedIcon = '';
      }
    };
  }]);
