define(['scripts/app'], function (hongcaiApp) {
	hongcaiApp.register.factory('LoginService', function ($resource, DEFAULT_DOMAIN) {
		return {
			userLogin: $resource(DEFAULT_DOMAIN + '/siteUser/login', {account: '@account', password: '@pwd' })
		};
	});
});