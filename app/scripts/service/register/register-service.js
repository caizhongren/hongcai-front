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


		timeCount: function(wait,val) {

        if ( wait == 0 ) {
            val.removeAttribute("disabled");          
            val.value = '获取验证码';
            val.className = 'get-verify-button verify-index';
            wait = 60;
        }else{
            val.setAttribute("disabled", true);
            val.className = 'get-verify-button verify-index grey';
            val.value = wait + "s 后重新发送";
            wait--;
            setTimeout(function() {
                time(val)
            },
            1000)
        	}
    	}
	};
});
