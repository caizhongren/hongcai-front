'use strict';
angular.module('hongcaiApp')
  .factory('ShareUtils', function($resource, DEFAULT_DOMAIN) {
    return {

		toWeibo: function(title, url, picurl){
			var sharesinastring='http://v.t.sina.com.cn/share/share.php?title='+title;  
			if(url){
				sharesinastring += '&url='+url+'&content=utf-8&sourceUrl='+url;
			}
			if(picurl){
				sharesinastring += '&pic='+picurl;
			}
 			window.open(sharesinastring,'newwindow','height=400,width=400,top=100,left=100'); 
    	},

		toQQzone: function(title, url, picurl){
			var shareqqzonestring='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary='+title;  

			if(url){
				shareqqzonestring += '&url='+url;
			}

			if(picurl){
				shareqqzonestring += '&pics='+picurl;
			}

 			window.open(shareqqzonestring,'newwindow','height=400,width=400,top=100,left=100');  
    	}



    };
  });
