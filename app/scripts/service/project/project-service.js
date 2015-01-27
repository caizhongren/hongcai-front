'use strict';
angular.module('hongcaiApp')
  .factory('ProjectService', function($resource, $location, DEFAULT_DOMAIN) {
    return {
      projectDetails: $resource(DEFAULT_DOMAIN + '/siteProject/getProjectDetail', {
        projectId: '@projectId'
      }),
      projectList: $resource(DEFAULT_DOMAIN + '/siteProject/getProjectList'),
      isAvailableInvest: $resource(DEFAULT_DOMAIN + '/siteProject/isAvailableInvest', {
        amount: '@amount',
        projectId: '@projectId'
      }),
      appointmentProject: $resource(DEFAULT_DOMAIN + '/siteReserve/getLatestSingleReserveProject'),
      reserve: $resource(DEFAULT_DOMAIN + '/siteReserve/reserve', {
        reserveAmount: '@reserveAmount',
        projectId: '@projectId'
      }),
      getProfit: $resource(DEFAULT_DOMAIN + '/siteReserve/getReserveInterest', {
        reserveAmount: '@reserveAmount',
        projectId: '@projectId'
      }),
      getReserveRecords: $resource(DEFAULT_DOMAIN + '/siteReserve/getProjectReserveRecords', {
        projectId: '@projectId'
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
        projectId: '@activityId',
        type: '@type'
      }),
      getYuebaoInterestRatesByDate: $resource(DEFAULT_DOMAIN + '/siteReserve/getYuebaoInterestRatesByDate', {})
    };
  });
