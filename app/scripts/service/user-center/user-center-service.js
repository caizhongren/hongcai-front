'use strict';
angular.module('hongcaiApp')
  .factory('UserCenterService', function($resource, DEFAULT_DOMAIN) {
    return {
      dayProfit: $resource(DEFAULT_DOMAIN + '/appUserCapital/dayProfit', {
        startTime: '@startTime',
        endTime: '@endTime'
      }),
      userSecurityInfo: $resource(DEFAULT_DOMAIN + '/siteUser/userSecurityInfo', {}),
      yeepayRegister: $resource(DEFAULT_DOMAIN + '/yeepay/register', {
        realName: '@realName',
        idNo: '@idNo'
      }),
      authorizeAutoTransfer: $resource(DEFAULT_DOMAIN + '/yeepay/authorizeAutoTransfer', {}),
      yeepayRecharge: $resource(DEFAULT_DOMAIN + '/yeepay/recharge', {
        amount: '@amount'
      }),
      yeepayWithdraw: $resource(DEFAULT_DOMAIN + '/yeepay/withdraw', {
        amount: '@amount'
      }),
      bindBankCard: $resource(DEFAULT_DOMAIN + '/yeepay/bindBankCard', {}),
      unbindBankCard: $resource(DEFAULT_DOMAIN + '/yeepay/unbindBankCard', {}),
      getUserAccount: $resource(DEFAULT_DOMAIN + '/siteAccount/userAccount'),
      getUserAvailableCash: $resource(DEFAULT_DOMAIN + '/siteAccount/getUserAvailableCash'),
      getUserOrder: $resource(DEFAULT_DOMAIN + '/siteOrder/getOrderByUser'),
      getOrderByUser: $resource(DEFAULT_DOMAIN + '/siteOrder/getOrderByUser', {
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
      sendMobileCaptcha: $resource(DEFAULT_DOMAIN + '/siteUser/mobileCaptcha', {
        mobile: '@mobile',
        picCaptcha: '@picCaptcha'
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
      checkMobileCaptcha: $resource(DEFAULT_DOMAIN + '/siteUser/checkMobileCaptcha', {
        mobile: '@mobile',
        captcha: '@captcha'
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
      generateContractPDF: $resource(DEFAULT_DOMAIN + '/siteProject/generateContractPDF', {
        projectId: '$projectId',
        orderId: '$orderId'
      }),
      generateContractPDFModel: $resource(DEFAULT_DOMAIN + '/siteProject/generateContractPDFModel', {}),
      generatePartContractPDF: $resource(DEFAULT_DOMAIN + '/siteProject/generatePartContractPDF', {
        projectId: '$projectId',
        orderId: '$orderId'
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
      getUserExperienceMoneyDetail: $resource(DEFAULT_DOMAIN + '/siteUser/getUserExperienceMoneyDetail'),
      getUserIncreaseRateCouponStatis: $resource(DEFAULT_DOMAIN + '/siteUser/getUserIncreaseRateCouponStatis'),
      getUnUsedIncreaseRateCoupons: $resource(DEFAULT_DOMAIN + '/siteUser/getUnUsedIncreaseRateCoupons'),
      resetMobile: $resource(DEFAULT_DOMAIN + '/yeepay/resetMobile', {mobile:'@mobile'})

    };
  });
