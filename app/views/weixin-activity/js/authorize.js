var APPID = "wxa315ecce54cf104d"
var REDIRECT_URI = "http%3A%2F%2Fweixin-activity.tunnel.mobi%2Fhongbao.html"
var authorizeUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + APPID + "&redirect_uri=" + REDIRECT_URI + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"

function authorize() {
  $.get(authorizeUrl, function(data) {
    alert(data);
  });
}

$(document).ready(function(){
	$('button').on('click', function(){
		authorize();
	})
});
