hongcaiApp.factory('UserCenterService', function ($resource, DEFAULT_DOMAIN) {
	return {
		yeepayRegister: $resource(DEFAULT_DOMAIN + '/yeepay/register', {realName: '@realName', idNo: '@idNo' }),
		getUserCapital: $resource(DEFAULT_DOMAIN + '/siteUser/getUserCapitalById')
	};
});
