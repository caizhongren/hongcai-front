'use strict';
angular.module('hongcaiApp')
  .factory('ProjectService', function($resource, $location, DEFAULT_DOMAIN) {
    return {
      projectDetails: $resource(DEFAULT_DOMAIN + '/siteProject/getProjectDetail', {
        number: '@number'
      }),
      projectList: $resource(DEFAULT_DOMAIN + '/siteProject/getProjectList'),
      isAvailableInvest: $resource(DEFAULT_DOMAIN + '/siteProject/isAvailableInvest', {
        amount: '@amount',
        projectId: '@projectId'
      }),
      getFundsProductTypeMap: $resource(DEFAULT_DOMAIN + '/siteFunds/getFundsProductTypeMap'),
      getFundsTotalStatisticalData: $resource(DEFAULT_DOMAIN + '/siteFunds/getFundsTotalStatisticalData'),
      getFundsProjectListByProductType: $resource(DEFAULT_DOMAIN + '/siteFunds/getFundsProjectListByProductType', {
        productType: '@productType'
      }),
      getFundsProjectDetailByNumber: $resource(DEFAULT_DOMAIN + '/siteFunds/getFundsProjectDetailByNumber', {
        number: '@number'
      }),
      isFundsAvailableInvest: $resource(DEFAULT_DOMAIN + '/siteFunds/isAvailableInvest', {
        amount: '@amount',
        projectId: '@projectId',
        isRepeat: '@isRepeat'
      }),
      appointmentProject: $resource(DEFAULT_DOMAIN + '/siteReserve/getLatestSingleReserveProject'),
      reserve: $resource(DEFAULT_DOMAIN + '/siteReserve/reserve', {
        reserveAmount: '@reserveAmount',
        projectId: '@projectId',
        inviteMobile: '@inviteMobile'
      }),
      getProfit: $resource(DEFAULT_DOMAIN + '/siteReserve/getReserveInterest', {
        reserveAmount: '@reserveAmount',
        projectId: '@projectId'
      }),
      getReserveRecords: $resource(DEFAULT_DOMAIN + '/siteReserve/getProjectReserveRecords', {
        number: '@number'
      }),
      projectShop: $resource(DEFAULT_DOMAIN + '/siteProject/getProjectShop', {
        projectId: '@projectId',
        amount: '@amount'
      }),
      sponsorInstitution: $resource(DEFAULT_DOMAIN + '/siteProject/sponsorInstitution', {
        guaranteeId: '@guaranteeId'
      }),
      getGiftProjectList: $resource(DEFAULT_DOMAIN + '/siteProject/getGiftProjectList'),
      activityDetails: $resource(DEFAULT_DOMAIN + '/siteProject/getProjectDetail', {
        number: '@number',
        type: '@type'
      }),
      getYuebaoInterestRatesByDate: $resource(DEFAULT_DOMAIN + '/siteReserve/getYuebaoInterestRatesByDate', {}),
      getOneDayProfitAndNextRate: $resource(DEFAULT_DOMAIN + '/siteFundsService/getOneDayProfitAndNextRate', {
        number: '@number'
      })
    };
  });
