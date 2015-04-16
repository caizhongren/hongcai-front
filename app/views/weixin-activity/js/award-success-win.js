var num = '';

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

var awardSuccessWin = new Vue({
  el: '#awardSuccessWin',
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

function openRecordList(num) {
  if (num) {
    var openRedPacketRecordUrl = "http://192.168.1.43:8100/hongcai/api/v1/siteRedPacket/getRedPacketTakeRecords?number=" + num;
    $.get(openRedPacketRecordUrl, function(data) {
      var _data = JSON.parse(data)
      console.log(_data)
      awardSuccessWin.$data.userList = _data.data.redPacketTakeRecords;
      awardSuccessWin.$data.content = _data.data.redPacket.takeMsg;
    })
  } else {
    cnosole.log("还没从api获取num")
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

function showM() {
  var M = $('.y_fu');
  if (M.css('display') === "none") {
    M.css('display', 'block')
  } else {
    M.css('display', 'none')
  }
}

function main() {
  var qstr = getQueryStringArgs();
  num = qstr["num"];
  awardSuccessWin.$data.amount = qstr["amount"];
  openRecordList(num);
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
        link: 'http://weixin-activity.tunnel.mobi/redirct.html?number'+_num, // 分享链接
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
