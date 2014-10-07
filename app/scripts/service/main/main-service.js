define(['scripts/app'], function (hongcaiApp) {
	hongcaiApp.register.factory('MainService', function ($resource, $location, DEFAULT_DOMAIN) {
		return {
			projectList: $resource(DEFAULT_DOMAIN + '/siteProject/getProjectList?sortType=false'),
			userLogin: $resource(DEFAULT_DOMAIN + '/siteUser/login', 
    			{account : '@account',
    			password : '@pwd'
    		})
		};
	});
});