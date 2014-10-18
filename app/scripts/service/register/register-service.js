hongcaiApp.factory('RegisterService', function ($resource, DEFAULT_DOMAIN) {
	return {
		saveRegister: $resource(DEFAULT_DOMAIN + '/siteUser/register', {}, {
			save: {method: "POST", params: {
				name: '@name', 
				type: '@type', 
				account: '@account', 
				password: '@password', 
				captcha: '@captcha'}}
		}),
        sendMobileCaptcha: $resource(DEFAULT_DOMAIN + '/siteUser/sendMobileCaptcha', {}, {
            save: {method: "POST", params: {mobile: '@mobile'}}
        })
	};
});
