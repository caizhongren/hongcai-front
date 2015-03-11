'use strict';
angular.module('hongcaiApp')
  .factory('OrderService', function ($resource, DEFAULT_DOMAIN) {
    return {
      investVerify: $resource(DEFAULT_DOMAIN + '/siteOrder/investVerify', {projectId: '@projectId',amount: '@amount'}),
      investVerifyFunds: $resource(DEFAULT_DOMAIN + '/siteOrder/investVerifyFunds', {projectId: '@projectId',amount: '@amount', isRepeat: '@isRepeat'}),
      hongbaoVerify: $resource(DEFAULT_DOMAIN + '/siteOrder/investVerify', {projectId: '@activityId',amount: '@amount'}),
      transfer: $resource(DEFAULT_DOMAIN + '/yeepay/transfer', {projectId: '@projectId', orderId: '@orderId'}),
      statisticsByUser: $resource(DEFAULT_DOMAIN + '/siteOrder/statisticsByUser', {orderId: '@orderId'}),
      getOrderListByProject: $resource(DEFAULT_DOMAIN + '/siteOrder/getOrderListByProject', {projectId: '@projectId'}),
      saveOrder: $resource(DEFAULT_DOMAIN + '/siteOrder/saveOrder', {projectId: '@projectId', investAmount: '@investAmount', giftCount: '@giftCount', inviteMobile: '@inviteMobile'}),
      saveFundsOrder: $resource(DEFAULT_DOMAIN + '/siteOrder/saveFundsOrder', {projectId: '@projectId', amount: '@amount', isRepeat: '@isRepeat'}),
      saveHongYunOrder: $resource(DEFAULT_DOMAIN + '/siteOrder/saveHongYunOrder', {projectId: '@projectId', investAmount: '@investAmount'}),
      saveTuhaoOrder: $resource(DEFAULT_DOMAIN + '/siteOrder/saveTuhaoOrder', {projectId: '@projectId', investAmount: '@investAmount'}),
      transferFunds: $resource(DEFAULT_DOMAIN + '/yeepay/transferFunds', {projectId: '@projectId', amount: '@amount', isRepeat: '@isRepeat'})
    };
  });
