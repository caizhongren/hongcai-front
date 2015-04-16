var num = '';
var code = '';
var openid = '';
var nickname = '';

function fetchUserInfo(code, _num) {
  // console.log("number:" + _num)
  console.log("fetching token !")
  var fetchUserInfoUrl = "http://192.168.1.43:8100/hongcai/api/v1/siteRedPacket/getRedPacketDetail?number=" + _num + "&code=" + code;
  // $.get(fetchUserInfoUrl, function(data) {
  //   document.getElementsByClassName("content")[0].innerHTML = data;
  //   var _data = JSON.parse(data)
  //     // console.log("fetchUserInfo:" + _data)
  //   var leftAmount = _data.data.redPacket.amount - _data.data.redPacket.payAmount;
  //   if (leftAmount <= 0) {
  //     changeToEnd(_num);
  //   } else {
  //     if (_data.data.headimgurl) {
  //       document.cookie = 'headimgurl=' + _data.data.headimgurl;
  //       award.$data.personImgUrl = _data.data.headimgurl;
  //     } else {
  //       award.$data.personImgUrl = getCookie("headimgurl");
  //     }

  //     if (_data.data.openid) {
  //       document.cookie = 'openid=' + _data.data.openid;
  //       openid = _data.data.openid;
  //     } else {
  //       openid = getCookie("openid");
  //     }

  //     if (_data.data.nickname) {
  //       document.cookie = 'nickname=' + _data.data.nickname;
  //       nickname = _data.data.nickname;
  //     } else {
  //       nickname = getCookie("nickname");
  //     }

  //     award.$data.amount = leftAmount;
  //     openRecordList(_num);
  //   }
  // })

  get(fetchUserInfoUrl, _num);
}

function get(url, _num) {
  var req = new XMLHttpRequest();
  if (req) {
    req.open("GET", url, true);
    req.onreadystatechange = function() {
      if (req.readyState == 4) {
        if (req.status == 200) {
          console.log("success");
          var data = req.responseText;
          // document.getElementsByClassName("content")[0].innerHTML = data;
          var _data = JSON.parse(data)
            // console.log("fetchUserInfo:" + _data)
          var leftAmount = _data.data.redPacket.amount - _data.data.redPacket.payAmount;
          if (leftAmount <= 0) {
            changeToEnd(_num);
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

            award.$data.amount = leftAmount;
            openRecordList(_num);
          }
        } else {
          console.log("error");
          document.getElementsByClassName("content")[0].innerHTML = req.responseText
        }
      }
    }
    req.send(null);
  }
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
    content: '。。。',
    userList: [{
      headimgurl: 'images/default_head.png',
      nickname: '王小二',
      amount: 20,
      updateTime: '1429068745404'
    }]
  },
  methods: {
    changeTime: function(time) {
      return moment(time).format('YYYY-MM-DD HH:mm')
    },
    changeContent: function(type) {
      switch (type) {
        case 1:
          return "红包";
          break;
        case 2:
          return "奖金";
          break;
        case 3:
          return "额外奖励";
          break;
        default:
          return "xxx"
      }
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
      console.log("请填写11位手机号")
    }
  } else {
    console.log("请填写手机号")
  }
}

function openRedPacketReq(num, mobile, openid, nickname, headimgurl) {
  var openRedPacketUrl = "http://192.168.1.43:8100/hongcai/api/v1/siteRedPacket/openRedPacket?number=" + num + "&mobile=" + mobile + "&openid=" + openid + "&nickname=" + nickname + "&headimgurl=" + headimgurl;

  $.get(openRedPacketUrl, function(data) {
    var _data = JSON.parse(data)
      // console.log("开红包:" + _data)
    if (_data.code) {
      switch (_data.code) {
        case -1086:
          console.log("没有红包抽取资格");
          break;
        case -1087:
          console.log("红包被抽空了");
          break;
        case -1041:
          console.log("活动已经过期");
          break;
        case -1002:
          console.log("参数错误");
          break;
        case -1001:
          console.log("缺少参数");
          break;
      }
    }
    if (_data.data.packetTakeRecord.type === 2) { //奖金
      var amount = _data.data.packetTakeRecord.amount;
      var newNum = _data.data.packetTakeRecord.redPacketNum;
      changeToSuccessCash(code, newNum, mobile, amount)
    } else if (_data.data.packetTakeRecord.type === 1) { //红包
      var amount = _data.data.packetTakeRecord.amount;
      var newNum = _data.data.packetTakeRecord.redPacketNum;
      changeToSuccessWin(newNum, amount)
    } else {
      console.log("打开红包type出错")
    }
  })
}

function openRecordList(num) {
  if (num) {
    var openRedPacketRecordUrl = "http://192.168.1.43:8100/hongcai/api/v1/siteRedPacket/getRedPacketTakeRecords?number=" + num;
    $.get(openRedPacketRecordUrl, function(data) {
      var _data = JSON.parse(data)
        // console.log("红包记录" + _data)
      award.$data.userList = _data.data.redPacketTakeRecords;
      award.$data.content = _data.data.redPacket.takeMsg;
    })
  } else {
    console.log("还没从api获取num")
  }
}


function changeToSuccessCash(code, num, mobile, amount) {
  window.location.href = "http://weixin-activity.tunnel.mobi/award-success-cash.html?code=" + code + "&num=" + num + "&mobile=" + mobile + "&amount=" + amount;

}

function changeToSuccessWin(num, amount) {
  window.location.href = "http://weixin-activity.tunnel.mobi/award-success-win.html?num=" + num + "&amount=" + amount;
}

function changeToEnd(num) {
  window.location.href = "http://weixin-activity.tunnel.mobi/award-end.html?num=" + num;
}

function main() {
  var qstr = getQueryStringArgs();
  code = qstr["code"];
  if (isHaveThisC("number")) {
    num = getCookie("number");
  } else {
    console.log("cookie 中没有 number")
  }
  // num = "WRP2001684150415322";
  try {
    fetchUserInfo(code, num);
  } catch (e) {
    console.log("请求用户信息失败")
  }
}

main();

var reqWeixinSdkUrl = encodeURIComponent(location.href.split('#')[0]);

var testUrl = "http://192.168.1.43:8100/hongcai/api/v1/siteRedPacket/getSignatureTimestampNoncestr?url=" + reqWeixinSdkUrl;

function test(url) {
  $.get(url, function(data) {
    var _data = JSON.parse(data);
    var _timestamp = _data.data.timestamp;
    // console.log(_timestamp)
    var _nonceStr = _data.data.nonceStr;
    // console.log(_nonceStr)
    var _signature = _data.data.signature;
    // console.log(_signature)

    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端console.log出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: 'wxa315ecce54cf104d', // 必填，公众号的唯一标识
      timestamp: _timestamp, // 必填，生成签名的时间戳
      nonceStr: _nonceStr, // 必填，生成签名的随机串
      signature: _signature, // 必填，签名，见附录1
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

    wx.ready(function() {
      var _num = num;
      wx.onMenuShareAppMessage({
        title: '红包活动测试',
        desc: '红包活动测试描述',
        link: 'http://weixin-activity.tunnel.mobi/redirct.html?number='+_num,
        imgUrl: 'http://img3.douban.com/view/movie_poster_cover/spst/public/p2166127561.jpg',
        trigger: function(res) {
          // alert('用户点击发送给朋友');
        },
        success: function(res) {
          // alert('已分享');
        },
        cancel: function(res) {
          // alert('已取消');
        },
        fail: function(res) {
          // alert(JSON.stringify(res));
        }
      });

      wx.onMenuShareTimeline({
        title: '红包活动测试', // 分享标题
        link: 'http://weixin-activity.tunnel.mobi/redirct.html?number='+_num, // 分享链接
        imgUrl: 'http://img3.douban.com/view/movie_poster_cover/spst/public/p2166127561.jpg', // 分享图标
        trigger: function(res) {
          // alert('用户点击发送给朋友');
        },
        success: function(res) {
          // alert('已分享');
        },
        cancel: function(res) {
          // alert('已取消');
        },
        fail: function(res) {
          // alert(JSON.stringify(res));
        }
      });
    });

    wx.error(function(res) {
      alert("error:" + res.errMsg)
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

    });
  });
}

test(testUrl);
