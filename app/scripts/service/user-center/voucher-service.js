hongcaiApp.factory('VouchersService', function($resource, $location, DEFAULT_DOMAIN) {
  return {
    inviteStat: $resource(DEFAULT_DOMAIN + '/vouchers/inviteStat', {}),


    getInviteList: $resource(DEFAULT_DOMAIN + '/vouchers/getInviteList', {}),


  };
});
