'use strict';
angular.module('hongcaiApp')
  .factory('UserCenterService', function($resource, DEFAULT_DOMAIN) {
    return {
      userSecurityInfo: $resource(DEFAULT_DOMAIN + '/siteUser/userSecurityInfo', {}),
      yeepayRegister: $resource(DEFAULT_DOMAIN + '/yeepay/register', {
        realName: '@realName',
        idNo: '@idNo'
      }),
      yeepayRecharge: $resource(DEFAULT_DOMAIN + '/yeepay/recharge', {
        amount: '@amount'
      }),
      yeepayWithdraw: $resource(DEFAULT_DOMAIN + '/yeepay/withdraw', {
        amount: '@amount'
      }),
      bindBankCard: $resource(DEFAULT_DOMAIN + '/yeepay/bindBankCard', {}),
      unbindBankCard: $resource(DEFAULT_DOMAIN + '/yeepay/unbindBankCard', {}),
      getUserCapital: $resource(DEFAULT_DOMAIN + '/siteUserCapital/getUserCapitalById'),
      getUserAvailableCash: $resource(DEFAULT_DOMAIN + '/siteUserCapital/getUserAvailableCash'),
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
      getUserBalance: $resource(DEFAULT_DOMAIN + '/siteUserCapital/getUserBalance'),
      sendMobileCaptcha: $resource(DEFAULT_DOMAIN + '/siteUser/sendMobileCaptcha', {
        mobile: '@mobile'
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
        type: '@type'
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
        token: '@token',
        password: '@password'
      }),
      getGiftListByUserId: $resource(DEFAULT_DOMAIN + '/activity/getGiftListByUserId'),
      getInviteList: $resource(DEFAULT_DOMAIN + '/activity/getInviteList'),
      getOrderBillByOrderId: $resource(DEFAULT_DOMAIN + '/siteOrder/getOrderBillByOrderId', {
        orderId: '$orderId'
      }),
      cancelOrder: $resource(DEFAULT_DOMAIN + '/siteOrder/cancelOrder', {
        orderId: '$orderId'
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
      updateSingleUserMsgStatus: $resource(DEFAULT_DOMAIN + '/siteMsg/updateOneUserMsgReadByUserMsgId', {
        userMsgId: '$userMsgId'
      }),
      updateAllUserMsgStatus: $resource(DEFAULT_DOMAIN + '/siteMsg/updateAllUserMsgReadByUserId', {}),
      pushAllUnpullMessages: $resource(DEFAULT_DOMAIN + '/siteMsg/pushAllUnpullMessages'),
      getUserReserveRecords: $resource(DEFAULT_DOMAIN + '/siteReserve/getUserReserveRecords', {})

    };
  });
