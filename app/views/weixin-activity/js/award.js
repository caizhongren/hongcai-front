var num = '';
var code = '';
var openid = '';
var nickname = '';

function fetchUserInfo(code, num) {
  alert(num)
  console.log("fetching token !")
  var fetchUserInfoUrl = "http://192.168.60.41:8080/hongcai/api/v1/siteRedPacket/getRedPacketDetail?number=" + num + "&code=" + code;
  $.get(fetchUserInfoUrl, function(data) {
    var _data = JSON.parse(data)
    console.log(_data)
    if (_data.data.redPacket.amount <= 0) {
      changeToEnd(num);
    } else {
      if (_data.data.headimgurl) {
        document.cookie = 'headimgurl=' + _data.data.headimgurl;
        award.$data.personImgUrl = _data.data.headimgurl;
      } else {
        award.$data.personImgUrl = getCookie("headimgurl");
      }

      if (_data.data.openid) {
        document.cookie = 'openid=' + _data.data.openid;
        openid = _data.data.openid;
      } else {
        openid = getCookie("openid");
      }

      if (_data.data.nickname) {
        document.cookie = 'nickname=' + _data.data.nickname;
        nickname = _data.data.nickname;
      } else {
        nickname = getCookie("nickname");
      }

      award.$data.amount = _data.data.redPacket.amount;
      openRecordList(num);
    }
  })

}

function getCookie(c_name) {
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) c_end = document.cookie.length;
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return ""
}

function isHaveThisC(c_name) {
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      return true;
    } else return false;
  }
}

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

var award = new Vue({
  el: '#award',
  data: {
    personImgUrl: 'images/default_head.png',
    phoneNum: '',
    amount: '',
    userList: [{
      headimgurl: 'images/default_head.png',
      nickname: '王小二',
      amount: 20,
      updateTime: '2015-03-31 18:58',
      content: 'Learn JavaScript'
    }]
  },
  methods: {
    changeTime: function(time) {
      return moment(time).format('YYYY-MM-DD HH:mm')
    }
  }
})

function openRedPacket() {
  var mobile = award.$data.phoneNum;
  var headimgurl = award.$data.personImgUrl;
  if (mobile) {
    if (mobile.match(/^[0-9]{11}$/)) {
      if (num) {
        openRedPacketReq(num, mobile, openid, nickname, headimgurl)
      } else {
        console.log("还没从api获取num")
      }
    } else {
      alert("请填写11位手机号")
    }
  } else {
    alert("请填写手机号")
  }
}

function openRedPacketReq(num, mobile, openid, nickname, headimgurl) {
  var openRedPacketUrl = "http://192.168.60.41:8080/hongcai/api/v1/siteRedPacket/openRedPacket?number=" + num + "&mobile=" + mobile + "&openid=" + openid + "&nickname=" + nickname + "&headimgurl=" + headimgurl;

  $.get(openRedPacketUrl, function(data) {
    var _data = JSON.parse(data)
    console.log(_data)
    if (_data.data.packetTakeRecord.type == 1) {
      var amount = _data.data.packetTakeRecord.amount;
      changeToSuccessCash(code, num, mobile, amount)
    } else if (_data.data.packetTakeRecord.type == 2) {
      var amount = _data.data.redPacket.amount;
      changeToSuccessWin(num,amount)
    } else {
      cnosole.log("打开红包出错")
    }
  })
}

function openRecordList(num) {
  if (num) {
    var openRedPacketRecordUrl = "http://192.168.60.41:8080/hongcai/api/v1/siteRedPacket/getRedPacketTakeRecords?number=" + num;
    $.get(openRedPacketRecordUrl, function(data) {
      var _data = JSON.parse(data)
        // console.log(_data)
      award.$data.userList = _data.data.redPacketTakeRecords;
    })
  } else {
    cnosole.log("还没从api获取num")
  }

}

function changeToSuccessCash(code, num, mobile, amount) {
  window.location.href = "http://weixin-activity.tunnel.mobi/award-success-cash.html?code=" + code + "&num=" + num + "&mobile=" + mobile + "&amount=" + amount;

}

function changeToSuccessWin(num, amount) {
  window.location.href = "http://weixin-activity.tunnel.mobi/award-success-win.html?num=" + num+"&amount=" + amount;
}

function changeToEnd(num) {
  window.location.href = "http://weixin-activity.tunnel.mobi/award-end.html?num=" + num;
}

function main() {
  var qstr = getQueryStringArgs();
  code = qstr["code"];
  num = getCookie("number");
  try {
    fetchUserInfo(code, num);
  } catch (e) {
    console.log("获取code失败")
  }
}

main();
