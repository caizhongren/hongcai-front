'use strict';
angular.module('hongcaiApp')
  .factory('UserCenterService', function($resource, DEFAULT_DOMAIN, RESTFUL_DOMAIN) {
    return {
      dayProfit: $resource(DEFAULT_DOMAIN + '/siteCredit/getUserDayProfit', {}),
      userSecurityInfo: $resource(DEFAULT_DOMAIN + '/siteUser/userSecurityInfo', {}),
      register: $resource(RESTFUL_DOMAIN + '/users/0/yeepayRegister', {
        realName: '@realName',
        idNo: '@idNo'
      }, {
        'post':   {method:'POST'}
      }),
      /**
       * 授权自动投标
       */
      authorizeAutoTransfer: $resource(RESTFUL_DOMAIN + '/users/0/authorizeAutoTransfer', {}, {'post':   {method:'POST'}}),
      recharge: $resource(RESTFUL_DOMAIN + '/users/0/recharge', {
        amount: '@amount',
        rechargeWay: '@rechargeWay',
        expectPayCompany: '@expectPayCompany'
      }, {
        'post':   {method:'POST'}
      }),
      withdraw: $resource(RESTFUL_DOMAIN + '/users/0/withdraw', {
        amount: '@amount'
      }, {
        'post':   {method:'POST'}
      }),
      bindBankCard: $resource(DEFAULT_DOMAIN + '/yeepay/bindBankCard', {}),
      unbindBankCard: $resource(DEFAULT_DOMAIN + '/yeepay/unbindBankCard', {}),
      getUserAccount: $resource(DEFAULT_DOMAIN + '/siteAccount/userAccount'),
      getUserAvailableCash: $resource(DEFAULT_DOMAIN + '/siteAccount/getUserAvailableCash'),
      getUserOrder: $resource(DEFAULT_DOMAIN + '/siteOrder/getOrderByUser'),
      getOrderByUser: $resource(DEFAULT_DOMAIN + '/siteOrder/getOrderByUser', {
        page: '@page',
        pageSize: '@pageSize',
        type: '@type',
        dateInterval: '@dateInterval',
        status: '@status'
      }),
      getGiftOrderByUser: $resource(DEFAULT_DOMAIN + '/siteOrder/getGiftOrderByUser', {
        type: '@type',
        dateInterval: '@dateInterval',
        status: '@status'
      }),
      getUserBalance: $resource(DEFAULT_DOMAIN + '/siteAccount/getUserBalance'),

      /**
       * 发送短信验证码
       * mobile: 手机号
       * picCaptcha: 图形验证码
       * business: 业务
       */
      sendMobileCaptcha: $resource(RESTFUL_DOMAIN + '/users/mobileCaptcha', {}, {
        save: {
          method: 'POST',
          params: {
            mobile: '@mobile',
            picCaptcha: '@picCaptcha',
            business: '@business',
            guestId: '@guestId'
          }
        }
      }),
      bindMobile: $resource(DEFAULT_DOMAIN + '/siteUser/bindMobile', {
        mobile: '@mobile',
        captcha: '@captcha'
      }),
      bindEmail: $resource(DEFAULT_DOMAIN + '/siteUser/bindEmail', {
        email: '@email'
      }),
      changePassword: $resource(DEFAULT_DOMAIN + '/siteUser/changePassword', {
        oldPassword: '@oldPassword',
        newPassword: '@newPassword',
        repeatNewPassword: '@repeatNewPassword'
      }),
      getUserBankCard: $resource(DEFAULT_DOMAIN + '/bank/getUserBankCard', {}),

      /**
       * 校验短信验证码
       */
      checkMobileCaptcha: $resource(DEFAULT_DOMAIN + '/siteUser/checkMobileCaptcha', {
        mobile: '@mobile',
        captcha: '@captcha',
        business: '@business'
      }),
      sendResetPwdEmail: $resource(DEFAULT_DOMAIN + '/siteUser/sendResetPwdEmail', {
        email: '@email'
      }),
      getDealByUser: $resource(DEFAULT_DOMAIN + '/siteUser/getDealListByUser', {
        dateInterval: '@dateInterval',
        dealType: '@dealType'
      }),
      resetMobilePassword: $resource(DEFAULT_DOMAIN + '/siteUser/resetMobilePassword', {
        mobile: '@mobile',
        captcha: '@captcha',
        password: '@password'
      }),
      infoVerify: $resource(DEFAULT_DOMAIN + '/siteUser/infoVerify', {
        account: '@account',
        mobile: '@mobile',
        email: '$email'
      }),
      resetEmailPassword: $resource(DEFAULT_DOMAIN + '/siteUser/resetEmailPassword', {
        uuid: '$uuid',
        etoken: '@etoken',
        password: '@password'
      }),
      checkEmailPasswordUrl: $resource(DEFAULT_DOMAIN + '/siteUser/checkEmailPasswordUrl', {
        uuid: '$uuid',
        etoken: '@etoken'
      }),
      getGiftListByUserId: $resource(DEFAULT_DOMAIN + '/activity/getGiftListByUserId'),
      getInviteList: $resource(DEFAULT_DOMAIN + '/activity/getInviteList'),
      getOrderBillByOrderId: $resource(DEFAULT_DOMAIN + '/siteOrder/getOrderBillByOrderId', {
        number: '$number'
      }),
      cancelOrder: $resource(DEFAULT_DOMAIN + '/siteOrder/cancelOrder', {
        number: '$number'
      }),
      luckyDraw: $resource(DEFAULT_DOMAIN + '/activity/luckyDraw', {}),
      getLuckyList: $resource(DEFAULT_DOMAIN + '/activity/getLuckyList', {}),
      getUnreadMsgCount: $resource(DEFAULT_DOMAIN + '/siteMsg/getUnreadMsgCount'),
      getUserMsgByStatus: $resource(DEFAULT_DOMAIN + '/siteMsg/getUserMsgByStatus', {
        status: '$status'
      }),
      readOneMsg: $resource(DEFAULT_DOMAIN + '/siteMsg/readOne', {
        userMsgId: '$userMsgId'
      }),
      readAllMsg: $resource(DEFAULT_DOMAIN + '/siteMsg/readAll', {}),
      deleteOneMsg: $resource(DEFAULT_DOMAIN + '/siteMsg/deleteUserMsg', {
        msgId: '$msgId'
      }),
      pushAllUnpullMessages: $resource(DEFAULT_DOMAIN + '/siteMsg/pushAllUnpullMessages'),
      getUserReserveRecords: $resource(DEFAULT_DOMAIN + '/siteReserve/getUserReserveRecords', {}),
      reserveCancel: $resource(DEFAULT_DOMAIN + '/siteReserve/reserveCancel', {
        reserveOrderId: '@reserveOrderId',
        projectId: '@projectId'
      }),

      // 债权相关
      getCreditRightStatistics: $resource(DEFAULT_DOMAIN + '/siteCredit/getCreditRightStatistics'),
      getHeldInCreditRightList: $resource(DEFAULT_DOMAIN + '/siteCredit/getHeldInCreditRightList'),
      getTranferCreditRightList: $resource(DEFAULT_DOMAIN + '/siteCredit/getTranferCreditRightList', {
        status: '@status'
      }),
      canTransferCreditRight: $resource(DEFAULT_DOMAIN + '/siteCredit/canTransferCreditRight', {
        number: '@number'
      }),
      hangTransferCreditRight: $resource(DEFAULT_DOMAIN + '/siteCredit/hangTransferCreditRight', {
        transferAmount: '@transferAmount',
        discountAmount: '@discountAmount',
        creditRightId: '@creditRightId'
      }),
      cancelCreditAssignment: $resource(DEFAULT_DOMAIN + '/siteCredit/cancelCreditAssignment', {
        assignmentNumber: '@assignmentNumber'
      }),
      transferToPlatform: $resource(DEFAULT_DOMAIN + '/yeepay/transferToPlatform', {
        transferAmount: '@transferAmount'
      }),

      getCreditDetail: $resource(DEFAULT_DOMAIN + '/siteCredit/getCreditDetail', {
        status: '@status',
        number: '@number'
      }),
      autoReinvest: $resource(DEFAULT_DOMAIN + '/siteFunds/fundsRepeatInvest', {
        repeat: '@repeat',
        creditRightId: '@creditRightId'
      }),
      putCreditRightInPool: $resource(DEFAULT_DOMAIN + '/siteCredit/putCreditRightInPool', {
        creditRightId: '@creditRightId'
      }),
      userExperienceDeals: $resource(DEFAULT_DOMAIN + '/siteUser/userExperienceDeals', {
        page : '@page',
        pageSize : '@pageSize',
        status : '@status'
      }),
      getUserIncreaseRateCouponStatis: $resource(DEFAULT_DOMAIN + '/siteUser/getUserIncreaseRateCouponStatis'),
      userIncreaseRateCoupons : $resource(DEFAULT_DOMAIN + '/siteUser/userIncreaseRateCoupons', {
        page : '@page',
        pageSize : '@pageSize',
        status : '@status'
      }),
      getUserCashCouponsStat: $resource(RESTFUL_DOMAIN + '/cashCoupons/stat'),
      userCashCoupons: $resource(RESTFUL_DOMAIN + '/cashCoupons', {
        status : '@status'
      }),
      cgtActive: $resource(RESTFUL_DOMAIN + '/userAuths/cgtActive', {}, {
        'active':   {method:'POST'}
      }),
      resetMobile: $resource(RESTFUL_DOMAIN + '/users/0/resetMobile', {
        mobile:'@mobile',
        captcha:'@captcha'
      }, {
        'post':   {method:'POST'}
      }),
      //获取用户已绑定卡限额信息
      getBankRechargeLimit: $resource(DEFAULT_DOMAIN + '/bank/getBankRechargeLimit', {
        bankCode:'@bankCode',
        payCompany:'@payCompany'
      }),
      //获取单笔充值限额信息
      getUserRechargeRemainLimit: $resource(DEFAULT_DOMAIN + '/bank/getUserRechargeRemainLimit', {
        userId:'@userId',
        payCompany:'@payCompany'
      }),
      //个人中心-债权管理
      //可转让债权列表
      assignmentsTransferablesList: $resource(RESTFUL_DOMAIN + '/users/transferables', {
        page: '@page', 
        pageSize: '@pageSize'
      }),
      //已转让债权列表
      assignmentsList: $resource(RESTFUL_DOMAIN + '/users/0/assignments', {
        page: '@page', 
        pageSize: '@pageSize',
        status: '@status'
      }),
      //撤销中
      cancelAssignment: $resource(RESTFUL_DOMAIN + '/users/0/assignments/:number', {}, {
        update: {
          method: 'PUT',
          params: {
            number: '@assignmentNumber', 
            status: '@status'
          }
        } 
      }),
      //确认撤销
      deleteAssignment: $resource(RESTFUL_DOMAIN + '/users/0/assignments/:number', {}, {
        update: {
          method: 'DELETE',
          params: {
            number: '@assignmentNumber'
          }
        } 
      }),
      //转让页面
      assignmentsTransfer: $resource(RESTFUL_DOMAIN + '/creditRights/:number/assignments', {
        number: '@number',
        creditRightId:'@creditRightId',
        amount:'@amount',
        annualEarnings:'@annualEarnings'
      }, {
        'post': {method:'POST'}
      }),
      // getAssignmentsDetail: $resource(RESTFUL_DOMAIN + '/creditRights/0/assignments', {
      //   number: '@number'
      // })
      getAssignmentsDetail: $resource(RESTFUL_DOMAIN + '/creditRights/0/assignments', {number: '@number'},
        {
        'get': {
          method:'GET',
          isArray: true  
        }
      })
    };
  });
