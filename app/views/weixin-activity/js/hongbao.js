var APPID = "wxa315ecce54cf104d",
  SECRET = "16486fad36e550805b261e7dbae0ecff";


function fetchToken(code) {
  console.log("fetching token !")
  fetchTokenUrl = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + APPID + "&secret=" + SECRET + "&code=" + code + "&grant_type=authorization_code";
  $.ajax({
    url: fetchTokenUrl,
    type: 'GET',
    dataType: 'JSONP',
    success: function(data) {
      fetchUserInfo(data.access_token, data.openid);
    }
  })
}

function getQueryStringArgs() {
  // 获取查询字符串参数，去除该字符串问号开关符号
  var qs = location.search.length > 0 ? location.search.substring(1) : "",
    args = {}, //存放所有查询字符串参数对
    items = qs.split("&"),
    len = items.length,
    name = null,
    value = null;
  if (qs.length == 0) {
    console.log("没有查询字符串,提前退行！");
    return;
  };
  for (var i = 0; i < len; i++) {
    item = items[i].split("=");
    name = decodeURIComponent(item[0]);
    value = decodeURIComponent(item[1]);
    args[name] = value;
  }
  return args;
}

function fetchUserInfo(access_token, openid) {
  var fetchUserInfoUrl = "https://api.weixin.qq.com/sns/userinfo?access_token=" + access_token + "&openid=" + openid + "&lang=zh_CN";
  $.ajax({
    url: fetchUserInfoUrl,
    type: 'GET',
    dataType: 'JSONP',
    success: function(data) {
      console.log(data)
    }
  })
}


$(document).ready(function() {
  var qstr = getQueryStringArgs();
  console.log(qstr["code"]);
  fetchToken(qstr["code"]);
});
