require.config({
    baseUrl: "",    
    paths: {
    	'angular': 'lib/angular/angular',
	    'angular-route': 'lib/angular-route/angular-route',
	    'angularAMD': 'lib/angularAMD/angularAMD',
	    'angular-touch': 'lib/angular-touch/angular-touch',
	    'angular-animate': 'lib/angular-animate/angular-animate',
	    'angular-cookies': 'lib/angular-cookies/angular-cookies',
	    'angular-md5': 'lib/angular-md5/angular-md5',
	    'angular-resource': 'lib/angular-resource/angular-resource'
    },
    shim: { 
    	'angularAMD': ['angular'], 
    	'angular-route': ['angular'], 
    	'angular-resource': ['angular']  
    },
    deps: ['scripts/app']
});