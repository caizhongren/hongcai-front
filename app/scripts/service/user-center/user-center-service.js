hongcaiApp.factory('UserCenterService', function ($resource, DEFAULT_DOMAIN) {
	return {
		userSecurityInfo: $resource(DEFAULT_DOMAIN + '/siteUser/userSecurityInfo', {}),
		yeepayRegister: $resource(DEFAULT_DOMAIN + '/yeepay/register', {realName: '@realName', idNo: '@idNo' }),
		yeepayRecharge: $resource(DEFAULT_DOMAIN + '/yeepay/recharge', {amount: '@amount' }),
		yeepayWithdraw: $resource(DEFAULT_DOMAIN + '/yeepay/withdraw', {amount: '@amount' }),
		bindBankCard: $resource(DEFAULT_DOMAIN + '/yeepay/bindBandCard', {}),
		getUserCapital: $resource(DEFAULT_DOMAIN + '/siteUser/getUserCapitalById'),
		getUserAvailableCash: $resource(DEFAULT_DOMAIN + '/siteUserCapital/getUserAvailableCash'),
		getUserOrder: $resource(DEFAULT_DOMAIN + '/siteOrder/getOrderByUser'),
/*		getUserBalance: function(response){
			$resource(DEFAULT_DOMAIN + 'siteUserCapital/getUserBalance').get({}, function(){

			});
		};*/
		
	};
});
