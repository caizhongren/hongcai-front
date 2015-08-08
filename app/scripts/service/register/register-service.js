'use strict';
angular.module('hongcaiApp')
  .factory('RegisterService', function($resource, DEFAULT_DOMAIN) {
    return {
      saveRegister: $resource(DEFAULT_DOMAIN + '/siteUser/register', {}, {
        save: {
          method: 'POST',
          params: {
            name: '@name',
            type: '@type',
            account: '@account',
            password: '@password',
            captcha: '@captcha',
            picCaptcha: '@picCaptcha',
            inviteCode: '@inviteCode',
            from: '@from'
          }
        }
      }),
      loadPageRegister: $resource(DEFAULT_DOMAIN + '/siteUser/loadPageRegister', {}, {
        save: {
          method: 'POST',
          params: {
            name: '@name',
            type: '@type',
            account: '@account',
            password: '@password',
            captcha: '@captcha',
            from: '@from'
          }
        }
      }),
      sendMobileCaptcha: $resource(DEFAULT_DOMAIN + '/siteUser/sendMobileCaptcha', {}, {
        save: {
          method: 'POST',
          params: {
            mobile: '@mobile'
          }
        }
      }),
      activeEmail: $resource(DEFAULT_DOMAIN + '/siteUser/activeEmail', {
        etoken: '@etoken'
      }, {})
    };
  });
