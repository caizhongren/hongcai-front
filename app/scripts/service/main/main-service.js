'use strict';
angular.module('hongcaiApp')
  .factory('MainService', function($resource, DEFAULT_DOMAIN) {
    return {
      projectList: $resource(DEFAULT_DOMAIN + '/siteProject/indexProjectList'),
      indexStatistics: $resource(DEFAULT_DOMAIN + '/siteOrder/indexStatistics'),
      //流量统计
      trafficStats: $resource(DEFAULT_DOMAIN + '/siteTrafficStats/trafficStats'),

      // 债权转让项目
      indexCreditRightList: $resource(DEFAULT_DOMAIN + '/siteCredit/indexCreditRightList')
    };
  });
