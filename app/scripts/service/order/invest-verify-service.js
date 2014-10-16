hongcaiApp.factory('investVerifyService', function ($resource, DEFAULT_DOMAIN) {
	return {
		isAvailableInvest: $resource(DEFAULT_DOMAIN + '/siteUser/isAvailableInvest', {user: '@amount'}),
	};
});
