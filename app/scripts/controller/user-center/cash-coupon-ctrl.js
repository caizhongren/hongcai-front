/*
 * @Author: hongcai
 * @Date:   2016-07-26 15:32:02
 * @Last Modified by:   fuqiang1
 * @Last Modified time: 2016-07-27 10:05:26
 */

'use strict';
angular.module('hongcaiApp')
  .controller('CashCouponCtrl', function($scope, $rootScope, $stateParams, UserCenterService) {
    /*
     * 投资统计
     */
    $scope.getUserCashCoupons = function() {
      UserCenterService.getUserCashCouponsStat.get(function(response) {
        if (!response || response.ret === -1) {
          return;
        }
        $scope.gotAmount = response.gotAmount;
        $scope.unGotAmount = response.unGotAmount;
      });
    }
    $scope.getUserCashCoupons();
    /*
     *查看现金券
     */
    $scope.userCashCoupons = function(status) {
      $scope.datas = [];
      $scope.usedStatus = status;
      UserCenterService.userCashCoupons.get({
        status: status
      }, function(response) {
        if (!response || response.ret === -1) {
          return;
        }
        $scope.CashCoupons = response.data;
        for (var i = 0; i < $scope.CashCoupons.length; i++) {
          $scope.datas.push($scope.CashCoupons[i]);
        }
      });
    };
    $scope.userCashCoupons('1');

    /*
     *悬浮显示规则
     */
    $scope.isRulesShow = false;
    $scope.showRules = function() {
      $scope.isRulesShow = true;
      angular.element('.rules-show').animate({
        height: 'show'
      }, 200);
    };
    $scope.hideRules = function() {
      $scope.isRulesShow = false;
    };
  });
