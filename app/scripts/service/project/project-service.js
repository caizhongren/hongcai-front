'use strict';
angular.module('hongcaiApp')
  .factory('ProjectService', function($resource, $location, DEFAULT_DOMAIN, RESTFUL_DOMAIN) {
    return {
      projectDetails: $resource(DEFAULT_DOMAIN + '/siteProject/getProjectDetail', {
        number: '@number'
      }),
      newbieBiaoProject: $resource(RESTFUL_DOMAIN + '/projects/newbieBiaoProject', {projectId: '@projectId'}, {
        get: {method:'GET'}
      }),
      investNewbieBiaoProjectVerify: $resource(RESTFUL_DOMAIN + '/projects/investNewbieBiaoProjectVerify', {number: '@number'}, {
        get: {method:'GET'}
      }),
      getExperienceProjectDetail: $resource(DEFAULT_DOMAIN + '/siteProject/getExperienceProjectDetail'),
      projectList: $resource(DEFAULT_DOMAIN + '/siteProject/getProjectList'),
      getAccountOverviewProjects: $resource(DEFAULT_DOMAIN + '/siteProject/getAccountOverviewProjects'),
      getFundsProductTypeMap: $resource(DEFAULT_DOMAIN + '/siteFunds/getFundsProductTypeMap'),
      getFundsTotalStatisticalData: $resource(DEFAULT_DOMAIN + '/siteFunds/getFundsTotalStatisticalData'),
      getFundsProjectListByProductType: $resource(DEFAULT_DOMAIN + '/siteFunds/getFundsProjectListByProductType', {
        productType: '@productType',
        range: '@range'
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
      /**
       * 宏金宝项目订单列表
       * @projectId 项目id
       * @projectType 项目类型
       */
      projectOrders: $resource(DEFAULT_DOMAIN + '/siteProject/projectOrders', {
        projectId: '@projectId', 
        projectType: '@projectType'
      }),
      /**
       * 宏金宝项目相关文件， 合同图片和借款企业图片
       * @projectId 项目id
       */
      projectFiles: $resource(DEFAULT_DOMAIN + '/siteProject/projectFiles', {
        projectId: '@projectId'
      }),
      /**
       * 查询借款企业信息
       * @enterpriseId 企业Id
       */
      getEnterpriseById: $resource(DEFAULT_DOMAIN + '/siteEnterprise/getEnterPriseById', {
        enterpriseId: '@enterpriseId'
      }),
      /**
       * 查询项目关联的文章
       * @projectId 项目id
       */
      projectTexts: $resource(DEFAULT_DOMAIN + '/siteProject/projectTexts', {
        projectId: '@projectId'
      }),

      /**
       * 项目合同模板
       * @projectId 项目id
       */
      contractPDFModel: $resource(DEFAULT_DOMAIN + '/siteProject/generateContractPDFModel', {
        projectId: '@projectId'
      }),

      
      getYuebaoInterestRatesByDate: $resource(DEFAULT_DOMAIN + '/siteReserve/getYuebaoInterestRatesByDate', {}),
      getOneDayProfitAndNextRate: $resource(DEFAULT_DOMAIN + '/siteFunds/getOneDayProfitAndNextRate', {
        number: '@number'
      }),
      generateRedPacketByInvest: $resource(DEFAULT_DOMAIN + '/siteRedPacket/generateRedPacketByInvest', {
        creditRightNum: '@number'
      })

    };
  });
