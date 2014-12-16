'use strict';
hongcaiApp.controller('ActiveEmailCtrl', ['$scope', '$state', '$rootScope', '$stateParams', 'RegisterService', 'DEFAULT_DOMAIN', 'toaster', 'md5', 'ipCookie', function ($scope, $state, $rootScope, $stateParams, RegisterService, DEFAULT_DOMAIN, toaster, md5, ipCookie) {

    if ($stateParams.etoken){
        RegisterService.activeEmail.get({etoken: $stateParams.etoken},function(response){
          if(response.ret == 1) {
             console.log('active success');
          } else {
              toaster.pop('warning', '提示', response.msg);
          }

        })
    }

}]);

