function getQueryStringArgs() {
  var qs = location.search.length > 0 ? location.search.substring(1) : "",
    args = {}, //存放所有查询字符串参数对
    items = qs.split("&"),
    len = items.length,
    name = null,
    value = null;
  if (qs.length == 0) {
    console.log("没有查询字符串");
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

function main() {
  var qstr = getQueryStringArgs();
  var num = qstr["number"];
  document.cookie = 'number=' + num;
  window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa315ecce54cf104d&redirect_uri=http%3A%2F%2Fweixin-activity.tunnel.mobi%2Faward.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
}

main();
