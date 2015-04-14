var num = '';
var mobile = '';

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

var awardSuccessCash = new Vue({
  el: '#awardSuccessCash',
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
    },
    changePhoneNum: function(phoneNum) {
      var subs = phoneNum.substr(3, 4);
      var newtel = phoneNum.replace(subs, "****");
      return newtel;
    }
  }
})

function openRecordList(num) {
  if (num) {
    var openRedPacketRecordUrl = "http://192.168.60.41:8080/hongcai/api/v1/siteRedPacket/getRedPacketTakeRecords?number=" + num;
    $.get(openRedPacketRecordUrl, function(data) {
      var _data = JSON.parse(data)
        console.log(_data)
      awardSuccessCash.$data.userList = _data.data.redPacketTakeRecords;
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

function main(){
  var qstr = getQueryStringArgs();
  code = qstr["code"];
  num = qstr["num"];
  mobile = qstr["mobile"];
  awardSuccessCash.$data.amount = qstr["amount"];
  awardSuccessCash.$data.personImgUrl = getCookie("headimgurl");
  awardSuccessCash.$data.phoneNum = mobile;
  openRecordList(num);
}
main();
